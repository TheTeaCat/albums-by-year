<template>
  <li class="album">
    <img
      v-if="lazyCoverString && !albumCoverLoaded"
      :src="'data:image/jpeg;base64,' + lazyCoverString"
    />
    <img
      v-if="online || albumCoverLoaded"
      v-show="albumCoverLoaded"
      @load="albumCoverLoaded = true"
      :src="albumCover"
    />

    <div class="album-title">
      <a :href="album.album.external_urls.spotify">{{ album.album.name }}</a>
    </div>

    <ul class="artists-list">
      <li v-for="artist in album.album.artists" :key="artist.id">
        <a :href="artist.external_urls.spotify">{{ artist.name }}</a>
      </li>
    </ul>

    <div class="album-release-date">{{ release_date }}</div>

    <button
      class="copy-button"
      @click="copyAlbumInfo"
      :title="copyButtonTitle"
      :class="{ copied: showCopiedState }"
    >
      <font-awesome-icon :icon="copyButtonIcon" />
      {{ copyButtonText }}
    </button>
  </li>
</template>

<script>
import axios from "axios";
import { Buffer } from 'buffer';

export default {
  props: ["album"],

  data() {
    return {
      albumCover: null,
      lazyCoverString: "",
      albumCoverLoaded: false,
      online: false,
      showCopiedState: false,
    };
  },

  computed: {
    release_date() {
      switch (this.album.album.release_date_precision) {
        case "year":
          return this.album.album.release_date.split("-")[0];
        case "month":
          return this.album.album.release_date.split("-").slice(0, 2).join("/");
        case "day":
          return this.album.album.release_date.replace(/-/g, "/");
        default:
          return "";
      }
    },
    copyButtonIcon() {
      return this.showCopiedState ? "check" : "copy";
    },
    copyButtonText() {
      return this.showCopiedState ? "Copied!" : "Copy";
    },
    copyButtonTitle() {
      return this.showCopiedState
        ? "Album info copied to clipboard"
        : "Copy album info";
    },
  },

  methods: {
    async copyAlbumInfo() {
      // Get the artist name (first artist if multiple)
      const artistName =
        this.album.album.artists.length > 0
          ? this.album.album.artists[0].name
          : "";

      // Get the album cover image URL (prefer the medium resolution one)
      let imageUrl = "";
      if (this.album.album.images && this.album.album.images.length > 0) {
        // Sort by resolution and pick medium size (around 300x300)
        const sortedImages = this.album.album.images.slice().sort((a, b) => {
          return (
            Math.abs(a.width * a.height - 300 * 300) -
            Math.abs(b.width * b.height - 300 * 300)
          );
        });
        imageUrl = sortedImages[0].url;
      }

      // Format the album info
      const albumInfo = {
        title: this.album.album.name,
        artist: artistName,
        image: imageUrl,
        url: this.album.album.external_urls.spotify,
      };

      // Convert to formatted JSON string
      const jsonString = JSON.stringify(albumInfo, null, 8);

      try {
        // Copy to clipboard
        await navigator.clipboard.writeText(jsonString);

        // Show success state
        this.showCopiedState = true;
        setTimeout(() => {
          this.showCopiedState = false;
        }, 2000);
      } catch (err) {
        console.error("Failed to copy: ", err);
        // Fallback for older browsers
        this.fallbackCopyTextToClipboard(jsonString);
      }
    },

    fallbackCopyTextToClipboard(text) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand("copy");
        this.showCopiedState = true;
        setTimeout(() => {
          this.showCopiedState = false;
        }, 2000);
      } catch (err) {
        console.error("Fallback: Could not copy text: ", err);
      }

      document.body.removeChild(textArea);
    },
  },

  async mounted() {
    //Set if online
    this.online = navigator.onLine;

    //Add event listeners for online status
    window.addEventListener(
      "online",
      function () {
        this.online = true;
      }.bind(this)
    );
    window.addEventListener(
      "offline",
      function () {
        this.online = false;
      }.bind(this)
    );

    //Find the lowest resolution image
    await this.album.album.images.sort((a, b) => {
      return a.width * a.height - b.width * b.height;
    });
    const albumCoverLowRes = this.album.album.images[0].url;

    //Check the cache for the low resolution image...
    const cache = await caches.open("albums-by-year-image-cache");
    let response = await cache.match(albumCoverLowRes);

    //...If it's not there, load and cache it as a base64 string...
    if (response == undefined) {
      response = await axios.get(albumCoverLowRes, {
        responseType: "arraybuffer",
      });
      const lazyCover = Buffer.from(response.data, "binary").toString("base64");
      await cache.put(
        albumCoverLowRes,
        new Response(JSON.stringify(lazyCover))
      );
      response = await cache.match(albumCoverLowRes);
    }

    //...then load it out of the response.
    this.lazyCoverString = await response.json();

    //Pick the image with the closest resolution to 300x300.
    await this.album.album.images.sort((a, b) => {
      return (
        Math.abs(a.width * a.height - 300 * 300) -
        Math.abs(b.width * b.height - 300 * 300)
      );
    });
    this.albumCover = this.album.album.images[0].url;
  },
};
</script>

<style lang="scss" scoped>
.album {
  padding: $spacer;

  flex-basis: 33.3%;
  @media (min-width: 750px) {
    flex-basis: 16.6%;
  }

  > * {
    margin-bottom: $spacer;
  }
  * {
    overflow-wrap: anywhere;
  }

  a {
    text-decoration: none;
  }

  img {
    width: 100%;
  }

  .album-title {
    font-weight: 700;
    font-size: 110%;
  }

  .artists-list {
    a {
      color: var(--text-colour-subtle);
    }
    a:hover {
      color: var(--text-colour-alt);
    }

    li {
      display: inline-block;
    }
    li::after {
      content: ", ";
      white-space: pre;
    }
    li:last-child::after {
      content: "";
    }
  }

  .copy-button {
    background: var(--background-alt-2);
    border: 2px solid var(--background-alt-3);
    color: var(--text-colour);
    padding: calc($spacer / 2) $spacer;
    border-radius: 4px;
    font-size: 85%;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: calc($spacer / 2);
    width: 100%;
    font-family: inherit;

    &:hover {
      background: var(--background-alt-3);
      border-color: var(--text-colour-alt);
    }

    &:active {
      transform: translateY(1px);
    }

    &.copied {
      background: var(--text-colour-alt);
      color: var(--background);
      border-color: var(--text-colour-alt);
    }

    svg {
      font-size: 12px;
    }
  }
}
</style>
