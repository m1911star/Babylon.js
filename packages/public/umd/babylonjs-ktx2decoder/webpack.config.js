const commonConfigGenerator = require("@dev/build-tools").webpackTools.commonUMDWebpackConfiguration;

module.exports = (env) => {
    const commonConfig = commonConfigGenerator({
        mode: env.production ? "production" : "development",
        devPackageName: "ktx2decoder",
        namespace: "KTX2DECODER",
        maxMode: true,
        devPackageAliasPath: `../../../tools/ktx2Decoder/dist`,
    });
    return commonConfig;
};
