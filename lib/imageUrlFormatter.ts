export default function imageUrlFormatter (imagePath: string) {
    return(`https://firebasestorage.googleapis.com/v0/b/foodorderhubadmin.firebasestorage.app/o/${encodeURIComponent(
                                     imagePath
                                     )}?alt=media`)
}