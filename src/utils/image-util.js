function getImageURL(name) {
    return new URL(`../assets/${name}`, import.meta.url)
}

export { getImageURL };