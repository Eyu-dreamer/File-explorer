// Select elements
let inputElement = document.querySelector("#file");
let docElement = document.querySelector("#doc");
let imageElement = document.querySelector("#image");
let audioElement = document.querySelector("#audio");
let videoElement = document.querySelector("#video");
let customInputWrapperDiv = document.querySelector("#custom_input");
let fileNameDisplayElement = document.querySelector(
  "#display_for_selected_file"
);
let downloadlink = document.querySelector("#download_link");
let url;
let downloadname;

// Event listener for file selection
inputElement.addEventListener("change", (event) => {
  let firstFile = event.target.files[0];
  let reader = new FileReader();

  // Display file name
  fileNameDisplayElement.textContent = firstFile.name;

  url = URL.createObjectURL(firstFile);
  // Read and display file content based on type
  if (firstFile.type === "text/plain") {
    reader.readAsText(firstFile);
    reader.onload = function (event) {
      docElement.textContent = event.target.result;
    };
  } else if (firstFile.type.startsWith("image/")) {
    reader.readAsDataURL(firstFile);
    reader.onload = function (event) {
      imageElement.src = event.target.result;
    };
  } else if (firstFile.type.startsWith("video/")) {
    reader.readAsDataURL(firstFile);
    reader.onload = function (event) {
      videoElement.src = event.target.result;
    };
  } else if (firstFile.type.startsWith("audio/")) {
    reader.readAsDataURL(firstFile);
    reader.onload = function (event) {
      audioElement.src = event.target.result;
    };
  }

  downloadname = fileNameDisplayElement.textContent;
  downloadlink.href = url;
  downloadlink.setAttribute("download", downloadname);
});
// Make customInputWrapperDiv a drop zone to preview files
customInputWrapperDiv.addEventListener("dragover", (event) => {
  event.preventDefault(); // Allow the element to accept drops
  customInputWrapperDiv.style.border = "3px solid yellow"; // Highlight on dragover
});

customInputWrapperDiv.addEventListener("dragleave", () => {
  event.preventDefault();
  customInputWrapperDiv.style.border = "3px solid red"; // Reset border on drag leave
});
customInputWrapperDiv.addEventListener("drop", (event) => {
  event.preventDefault();

  // Check if files are available
  let files = event.dataTransfer.files;

  if (files.length === 0) {
    console.error("No files dropped.");
    return;
  }

  let firstFile = files[0];
  let reader = new FileReader();
  url = URL.createObjectURL(firstFile);
  // Validate and display file name
  if (fileNameDisplayElement) {
    fileNameDisplayElement.textContent = firstFile.name;
  } else {
    console.warn("fileNameDisplayElement is not defined.");
  }

  // Read and display file content based on type
  if (firstFile.type === "text/plain") {
    reader.readAsText(firstFile);
    reader.onload = function (event) {
      if (docElement) {
        docElement.textContent = event.target.result;
      } else {
        console.warn("docElement is not defined.");
      }
    };
  } else if (firstFile.type.startsWith("image/")) {
    reader.readAsDataURL(firstFile);
    reader.onload = function (event) {
      if (imageElement) {
        imageElement.src = event.target.result;
      } else {
        console.warn("imageElement is not defined.");
      }
    };
  } else if (firstFile.type.startsWith("video/")) {
    reader.readAsDataURL(firstFile);
    reader.onload = function (event) {
      if (videoElement) {
        videoElement.src = event.target.result;
      } else {
        console.warn("videoElement is not defined.");
      }
    };
  } else if (firstFile.type.startsWith("audio/")) {
    reader.readAsDataURL(firstFile);
    reader.onload = function (event) {
      if (audioElement) {
        audioElement.src = event.target.result;
      } else {
        console.warn("audioElement is not defined.");
      }
    };
  } else {
    console.warn("Unsupported file type:", firstFile.type);
  }

  downloadname = fileNameDisplayElement.textContent;
  downloadlink.href = url;
  downloadlink.setAttribute("download", downloadname);
});
/* majore take away from this projects;
we can get array of chosen files from the input-file element using 
#even.target.files; from change event;
we can get array of droped files from dropevent;
event.dataTransfer.files;
we can't use variables initialized inside function outside of it!
concept of blob and URL.creatObjectURL()?*/
/*next challenge make selection allowed upto each should be different and make each to be previewable, also add select download with the download link?*/
