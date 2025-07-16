<template>
  <li class="album">
    <div class="image-container">
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
      <button
        class="copy-button"
        @click="copyAlbumInfo"
        :title="copyButtonTitle"
        :class="{ copied: showCopiedState }"
      >
        <font-awesome-icon :icon="copyButtonIcon" />
      </button>
    </div>

    <div class="album-title">
      <a :href="album.album.external_urls.spotify">{{ album.album.name }}</a>
    </div>

    <ul class="artists-list">
      <li v-for="artist in album.album.artists" :key="artist.id">
        <a :href="artist.external_urls.spotify">{{ artist.name }}</a>
      </li>
    </ul>

    <div class="album-release-date">{{ release_date }}</div>
  </li>
</template>

<script>
import axios from "axios";
import { Buffer } from 'buffer';

export default {
  props: ["album", "copy_mode"],

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
    copyButtonTitle() {
      return this.showCopiedState
        ? "Album info copied to clipboard"
        : "Copy album info";
    },
  },

  methods: {
    async copyAlbumInfo() {
      let clipboardText;
      
      if (this.copy_mode === "json") {
        // Create JSON object to copy to clipboard
        const albumData = {
          title: this.album.album.name,
          artist: this.album.album.artists.length > 0 ? this.album.album.artists[0].name : "",
          image: this.albumCover,
          url: this.album.album.external_urls.spotify,
        };
        clipboardText = JSON.stringify(albumData, null, 2);
      } else {
        // Create text format to copy to clipboard
        clipboardText = this.album.album.artists.length > 0
          ? `${this.album.album.artists[0].name} - ${this.album.album.name}: ${this.album.album.external_urls.spotify}`
          : `${this.album.album.name}: ${this.album.album.external_urls.spotify}`;
      }

      try {
        // Copy to clipboard
        await navigator.clipboard.writeText(clipboardText);

        // Show success state
        this.showCopiedState = true;
        setTimeout(() => {
          this.showCopiedState = false;
        }, 2000);
      } catch (err) {
        console.error("Failed to copy: ", err);
        // Fallback for older browsers
        this.fallbackCopyTextToClipboard(clipboardText);
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

  .image-container {
    position: relative;
    width: 100%;

    img {
      width: 100%;
      display: block;
    }

    .copy-button {
      position: absolute;
      top: 8px;
      right: 8px;
      background: rgba(0, 0, 0, 0.7);
      border: none;
      color: white;
      padding: 8px;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.2s ease;
      opacity: 0;
      transform: scale(0.8);
      font-size: 14px;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: rgba(0, 0, 0, 0.9);
        transform: scale(1);
      }

      &.copied {
        background: var(--text-colour-alt);
        opacity: 1;
        transform: scale(1);
      }

      svg {
        font-size: 12px;
      }
    }

    &:hover .copy-button {
      opacity: 1;
      transform: scale(1);
    }
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

}
</style>
