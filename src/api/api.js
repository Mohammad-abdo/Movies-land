const ApiConfig={
    baseurl:'https://api.themoviedb.org/3/',
    apiKey:'9fd4f82abd9873f00e717892f1f9ea97',
    originalImage:(imgPath)=>`https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image:(imgPath)=>`https://image.tmdb.org/t/p/ w500/${imgPath}`
}
export default ApiConfig;