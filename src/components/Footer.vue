<template>
  <footer class="footer">
    <div class="container">
      <div class="content-wrapper">
        <div class="logo">
          <img class="logo-svg" src="@/assets/images/logo-covid19.svg" alt />
          <span>Outbreak Results</span>
        </div>
        <div class="credits">
          <span class="madeby">
            Made by
            <a
              href="https://twitter.com/marcoribeiroweb"
              target="_blank"
              rel="noopener noreferrer"
            >@marcoribeiroweb</a>
            👨🏻‍💻
          </span>
          <span class="data">
            Data source from
            <a
              href="https://github.com/NovelCOVID/API"
              target="_blank"
              rel="noopener noreferrer"
            >NovelCOVID API</a>
            🦠
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.content-wrapper {
  @include padding(30px 0);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #eef3f9;

  @media only screen and (max-width: 550px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.logo {
  display: flex;
  align-items: center;

  .logo-svg {
    width: 28px;
  }

  span {
    display: block;
    @include f-medium;
    @include font-size(14px);
    margin-left: 10px;
  }
}

.credits {
  display: flex;
  align-items: center;

  @media only screen and (max-width: 750px) {
    flex-direction: column;
    align-items: flex-start;
  }

  @media only screen and (max-width: 550px) {
    margin-top: 25px;
  }

  .madeby,
  .data {
    @include f-regular;
    @include font-size(12px);

    a {
      color: #7565e5;
      text-decoration: none;
    }
  }

  .madeby {
    margin-right: 20px;

    @media only screen and (max-width: 750px) {
      margin-right: 0;
      margin-bottom: 10px;
    }
  }
}
</style>