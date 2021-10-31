module.exports = {
  src_folders: ["tests"],

  test_settings: {
    chrome: {
      desiredCapabilities: {
        browserName: "chrome",
        chromeOptions: {
          args: ["--headless", "--no-sandbox"],
        },
      },

      webdriver: {
        start_process: true,
        server_path: require('chromedriver').path,
      }
    },

    firefox: {
      desiredCapabilities: {
        browserName: "firefox",
        alwaysMatch: {
          "moz:firefoxOptions": {
            "args": ["-headless"]
          }
        }
      },

      webdriver: {
        start_process: true,
        server_path: require('geckodriver').path,
      }
    },
  }
};