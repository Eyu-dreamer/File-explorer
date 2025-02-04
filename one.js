// Select elements
let inputElement = document.querySelector("#file");
let docElement = document.querySelector("#doc");
let imageElement = document.querySelector("#image");
let audioElement = document.querySelector("#audio");
let videoElement = document.querySelector("#video");
let fileNameDisplayElement = document.querySelector(
    "#display_for_selected_file"
);

// Event listener for file selection
inputElement.addEventListener("change", (event) => {
    let firstFile = event.target.files[0];
    let reader = new FileReader();

    // Display file name
    fileNameDisplayElement.textContent = firstFile.name;

    // Read and display file content based on type
    if (firstFile.type === "text/plain") {
        reader.readAsText(firstFile);
        reader.onload = function(event) {
            docElement.textContent = event.target.result;
        };
    } else if (firstFile.type.startsWith("image/")) {
        reader.readAsDataURL(firstFile);
        reader.onload = function(event) {
            imageElement.src = event.target.result;
        };
    } else if (firstFile.type.startsWith("video/")) {
        reader.readAsDataURL(firstFile);
        reader.onload = function(event) {
            videoElement.src = event.target.result;
        };
    } else if (firstFile.type.startsWith("audio/")) {
        reader.readAsDataURL(firstFile);
        reader.onload = function(event) {
            audioElement.src = event.target.result;
        };
    }
});