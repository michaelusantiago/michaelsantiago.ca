const postcssJitProps = require('postcss-jit-props');
const OpenProps = require('open-props');

const config = {
    plugins: [
        postcssJitProps(OpenProps),
        require('postcss-nested'),
        require('postcss-each'),
        require('autoprefixer')
    ]
}

module.exports = config