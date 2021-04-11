// Return dimensions with max length while mainaining aspect ratio
export function changeDimensions(width, height, maxLength) {
    const aspect = width <= height ? width / height : height / width;

    const x = width >= height ? maxLength : maxLength * aspect;
    const y = height > width ? maxLength : maxLength * aspect;

    return [x, y];
}