const { withPlausibleProxy } = require("next-plausible")

module.exports = withPlausibleProxy({
    customDomain: "https://insight.infi.sh"
})({
    swcMinify: true,
    compiler: {
        styledComponents: true
    }
})