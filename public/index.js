const menuBtn = document.querySelector(".menu_btn");
const sidebar = document.querySelector(".sidebar");
const navLinkUl = document.querySelector(".nav_list");
const logoIcon = document.querySelector(".logo_icon");
const logoName = document.querySelector(".logo_name");
const linksName = document.querySelectorAll(".links_name");
const musicLink = document.querySelector(".music_link");
const videoLink = document.querySelector(".video_link");
const mediaList = document.querySelector(".media_list");
const pageContent = document.querySelector(".page_content");
const pageHeader = document.querySelector(".page_header");
const adminLink = document.querySelector(".admin_link");
const quitLink = document.querySelector(".quit_link");
const musicLinkStarter = document.querySelector(".music_link_starter");
const videoLinkStarter = document.querySelector(".video_link_starter");

const playerSection = document.querySelector(".player-section");
const audioPlayer = document.querySelector(".audio_player");
const videoPlayerSection = document.querySelector(".video_player_section");
const videoWindow = document.querySelector(".video_window");
const videoSource = document.querySelector(".video_source");

const sortingArea = document.querySelector(".sorting_area");
const sortTexts = document.querySelectorAll(".sort_text");
const sortButtons = document.querySelectorAll(".sorting_button");
const sortName = document.querySelector(".sorting_name_button");
const sortReverse = document.querySelector(".sorting_reverse_button");
const sortNew = document.querySelector(".sorting_newest_button");
const sortOld = document.querySelector(".sorting_oldest_button");

const songTitle = document.querySelector(".song_title");
const audioInput = document.querySelector(".audio_input");
const playButton = document.querySelector("#play_button");
const pauseButton = document.querySelector("#pause_button");
const musicPlayer = document.querySelector(".music_player");

const songTimeLine = document.querySelector(".song_time_line");
const timeInLine = document.querySelector(".time_in_line");

const speakerOnButton = document.querySelector("#speaker_on_button");
const speakerOffButton = document.querySelector("#speaker_off_button");
const volumeSlider = document.querySelector("#change_vol");

const formSection = document.querySelector(".form_section");
const adminAudioBtn = document.querySelector(".admin_audio_button");
const adminVideoBtn = document.querySelector(".admin_video_button");
const adminAddBtn = document.querySelector(".admin_add_button");
const adminLeaveBtn = document.querySelector(".admin_leave_button");
const adminForms = document.querySelector(".admin_forms");
const newMediaForm = document.querySelector(".new_media_form");
const uploadButton = document.querySelector("#upload_button");
const formResponce = document.querySelector(".form_responce");

pauseButton.style.display = "none";
speakerOffButton.style.display = "none";
sortingArea.style.display = "none";

//empty media array
let media = [];
let mediaSort = "";

//JSON files
let audioFiles = "audio.json";
let videoFiles = "video.json";

//get JSON data from file
async function getJSON(mediaData, who) {
  const responce = await fetch(mediaData);
  const mediaArray = await responce.json();
  media = mediaArray;
  mediaSort = mediaData;
  console.log("mitä array sisältää", media);
  if (mediaData == audioFiles && who == "user") {
    console.log("musiikkia luvassa");
    printMedia("mus");
  } else if (mediaData == videoFiles && who == "user") {
    console.log("videoita tulossa");
    printMedia("vid");
  } else if (mediaData == audioFiles && who == "admin") {
    console.log("musiikkia listataan");
    printAdminMedia("mus");
  } else if (mediaData == videoFiles && who == "admin") {
    console.log("videoita listataan");
    printAdminMedia("vid");
  }
}

//toggle sidebar
menuBtn.onclick = () => {
  sidebar.classList.toggle("active");

  if (sidebar.classList.contains("active")) {
    for (let i = 0; i < linksName.length; i++) {
      linksName[i].style.display = "none";
    }
    for (let i = 0; i < sortTexts.length; i++) {
      sortTexts[i].style.display = "none";
    }
    for (let i = 0; i < sortButtons.length; i++) {
      sortButtons[i].style.width = "30px";
    }
    pageContent.style.left = "104px";
    formSection.style.left = "104px";
    logoIcon.style.display = "none";
    logoName.style.display = "none";
    sidebar.style.width = "40px";
    menuBtn.style.left = "50%";
    videoPlayerSection.style.right = "94px";
    navLinkUl.style.padding = "0";
  } else {
    for (let i = 0; i < linksName.length; i++) {
      linksName[i].style.display = "block";
    }
    for (let i = 0; i < sortTexts.length; i++) {
      sortTexts[i].style.display = "block";
    }
    for (let i = 0; i < sortButtons.length; i++) {
      sortButtons[i].style.width = "80px";
    }
    pageContent.style.left = "240px";
    formSection.style.left = "240px";
    logoIcon.style.display = "flex";
    logoName.style.display = "flex";
    sidebar.style.width = "176px";
    menuBtn.style.left = "85%";
    videoPlayerSection.style.right = "28px";
    navLinkUl.style.padding = "0 8px";
  }
};

//print music and audio cards
musicLink.onclick = (e) => {
  e.preventDefault();
  showMusic();
};
musicLinkStarter.onclick = (e) => {
  e.preventDefault();
  showMusic();
};
function showMusic() {
  formSection.style.display = "none";
  sortingArea.style.display = "block";
  closeVideoPlayer();
  getJSON(audioFiles, "user");
  console.log("musalinkkiä painettu");
}

//print video cards
videoLink.onclick = (e) => {
  e.preventDefault();
  showVideo();
};
videoLinkStarter.onclick = (e) => {
  e.preventDefault();
  showVideo();
};
function showVideo() {
  formSection.style.display = "none";
  sortingArea.style.display = "block";
  closeVideoPlayer();
  closeAudioPlayer();
  getJSON(videoFiles, "user");
  console.log("videolinkkiä painettu");
}

//sortMedia
const sortMedia = () => {
  media.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  return media;
};

let sendMedClass = "";
//sort by name a-ö
sortName.onclick = () => {
  sortMedia();
  mediaSort == "audio.json" ? (sendMedClass = "mus") : (sendMedClass = "vid");
  printMedia(sendMedClass);
};
//sort by name ö-a
sortReverse.onclick = () => {
  sortMedia();
  media.reverse();
  mediaSort == "audio.json" ? (sendMedClass = "mus") : (sendMedClass = "vid");
  printMedia(sendMedClass);
};
let getFiles;
//sort by age newest
sortNew.onclick = () => {
  mediaSort == "audio.json" ? (getFiles = audioFiles) : (getFiles = videoFiles);
  console.log("media json", media);
  getJSON(getFiles, "user")
    .then(function () {
      media.reverse();
      console.log("media json käännetty", media);
    })
    .then(function () {
      mediaSort == "audio.json"
        ? (sendMedClass = "mus")
        : (sendMedClass = "vid");
      printMedia(sendMedClass);
    });
};
//sort by age oldest
sortOld.onclick = () => {
  mediaSort == "audio.json" ? (getFiles = audioFiles) : (getFiles = videoFiles);
  console.log("media json", media);
  getJSON(getFiles, "user");
};

//close video player
function closeVideoPlayer() {
  videoPlayerSection.style.display = "none";
  videoWindow.pause();
  videoSource.src = "";
}
//close audio player
function closeAudioPlayer() {
  musicPlayer.src = "";
  songTitle.innerHTML = "";
  timeInLine.style.width = 0;
  pauseButton.style.display = "none";
  playButton.style.display = "block";
}
//print media cards
function printMedia(medClass) {
  mediaList.innerHTML = "";
  let mediaFunction = "";
  let mediaClass = "";
  if (medClass == "mus") {
    pageHeader.innerHTML = "Musiikkia ja äänimaisemaa sinulle";
    playerSection.style.display = "flex";
    mediaClass = "audio/";
    mediaFunction = "playAudio";
    console.log(mediaFunction);
  } else if (medClass == "vid") {
    pageHeader.innerHTML = "Videoita hyvinvointiisi";
    playerSection.style.display = "none";
    mediaClass = "video/";
    mediaFunction = "playVideo";
    console.log(mediaFunction);
  }

  for (let i in media) {
    const mediaName = "`" + mediaClass + media[i].media + "`";
    mediaList.innerHTML +=
      "<div class='playlist-card' onclick='" +
      mediaFunction +
      "(" +
      mediaName +
      ",`" +
      media[i].name +
      "`" +
      ")'>" +
      "<img src='media/images/" +
      (media[i].image == "" ? "audio-612x612.jpg" : media[i].image) +
      "'" +
      "class='playlist-card-img' alt='Image of media'" +
      "/>" +
      "<div class='playlist-card-info'><p class='playlist-card-name'>" +
      media[i].name +
      "</p>" +
      "<p class='playlist-card-artist'>" +
      media[i].artist +
      "</p>" +
      "<p class='playlist-card-description'>" +
      media[i].description +
      "</p>" +
      "<p class='playlist-card-length'> Kesto: " +
      media[i].length +
      "</p>" +
      "</div></div>";
  }
}

//show pause icon when audio playing
function play_audio() {
  musicPlayer.play();
  playButton.style.display = "none";
  pauseButton.style.display = "block";
}
//show play icon when audio paused
function pause_audio() {
  musicPlayer.pause();
  pauseButton.style.display = "none";
  playButton.style.display = "block";
}
//update current audio duration
function updatetime(e) {
  const { duration, currentTime } = e.srcElement;
  const timePercent = (currentTime / duration) * 100;
  timeInLine.style.width = `${timePercent}%`;
  //console.log(e.srcElement.duration);
}
//click audio position
function setTime(e) {
  const pointInLine = this.clientWidth;
  const clickX = e.offsetX;
  const duration = musicPlayer.duration;

  musicPlayer.currentTime = (clickX / pointInLine) * duration;
}
//set volume slider to 100
let volumeSliderValue = 100;
//mute audio
function audio_off() {
  speakerOnButton.style.display = "none";
  speakerOffButton.style.display = "block";
  volumeSliderValue = volumeSlider.value;
  console.log("volume value: ", volumeSliderValue);
  musicPlayer.volume = 0;
  volumeSlider.value = 0;
}
//unmute audio
function audio_on() {
  speakerOnButton.style.display = "block";
  speakerOffButton.style.display = "none";
  musicPlayer.volume = volumeSliderValue / 100;
  volumeSlider.value = volumeSliderValue;
}
//set volume on slider
function setVolume() {
  musicPlayer.volume = volumeSlider.value / 100;
  checkVolumeValue();
}
//check volume value on choose right icon
function checkVolumeValue() {
  console.log("check vol value: ", musicPlayer.volume);
  if (musicPlayer.volume === 0) {
    speakerOnButton.style.display = "none";
    speakerOffButton.style.display = "block";
  } else {
    speakerOnButton.style.display = "block";
    speakerOffButton.style.display = "none";
  }
}
//print admin media lists
function printAdminMedia(medClass) {
  console.log("Printataan", medClass);
  adminForms.innerHTML = "";
  adminForms.innerHTML +=
    "<tr><th>Kuva</th><th>Nimi</th><th>Esittäjä</th><th>Kuvaus</th><th>Kesto</th><th>File</th><th>Poista</th></tr>";

  for (let i in media) {
    adminForms.innerHTML +=
      "<tr><td><img class='form_list_images' src='../media/images/" +
      (media[i].image == "" ? "audio-612x612.jpg" : media[i].image) +
      "'/></td><td>" +
      media[i].name +
      "</td><td>" +
      media[i].artist +
      "</td><td>" +
      media[i].description +
      "</td><td>" +
      media[i].length +
      "</td><td>" +
      media[i].media +
      "</td><td>" +
      `<button class="remove_index" onclick="removeMedia(` +
      "`" +
      `${i}` +
      "`, `" +
      `${medClass}` +
      "`" +
      `)">${i}</button>` +
      "</td></tr>";
  }
}
//admin media store media form
function storeMedia() {
  adminForms.innerHTML = "";
  newMediaForm.style.display = "block";
}

//get form data and send to store json
function handleSubmit() {
  const formDataJson = new FormData(newMediaForm);
  const medClass = formDataJson.get("mediaformat");
  const artist = formDataJson.get("artist");
  const description = formDataJson.get("description");
  let image = "";
  if (imagefile.files[0].name === null) {
    image = "";
  } else {
    image = imagefile.files[0].name;
  }
  const length = formDataJson.get("length");
  const media = mediafile.files[0].name;
  const name = formDataJson.get("name");
  console.log({ artist, description, image, length, media, name });
  const mediaInfo = { artist, description, image, length, media, name };

  return [mediaInfo, medClass];
}

//store to json
async function storeJson(data, medClass) {
  let fetchClass;
  if (medClass == "audio") {
    fetchClass = audioFiles;
  }
  if (medClass == "video") {
    fetchClass = videoFiles;
  }
  const response = await fetch(fetchClass);
  const result = await response.json();
  console.log("mitä dataa?", data);
  result.push(data);
  console.log("storeJson response", result);
  return result;
}

//send data to emmit.js
async function uploadFiles(e) {
  e.preventDefault();
  const submitdata = handleSubmit();
  const newJsonData = await storeJson(submitdata[0], submitdata[1]);

  console.log("tuleeko json dataa?", newJsonData);
  console.log("upload files activated");

  const newMediaJson = JSON.stringify(submitdata[0]);
  const newFulllJson = JSON.stringify(newJsonData);
  let formData = new FormData();
  const uploadMediaClass = submitdata[1];
  formData.append("imagefile", imagefile.files[0]);
  formData.append("mediafile", mediafile.files[0]);
  //formData.append("newmedia", newMediaJson);
  formData.append("newjsonmedia", newFulllJson);
  formData.set("mediaformat", submitdata[1]);

  await fetch(`http://localhost:3003/${uploadMediaClass}`, {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      console.log(res);
      formResponce.innerHTML = "Tiedosto tallennettu!";
      document.querySelector(
        "input[name='mediaformat']:checked"
      ).checked = false;
      document.getElementById("imagefile").value = null;
      document.getElementById("name").value = null;
      document.getElementById("artist").value = null;
      document.getElementById("description").value = null;
      document.getElementById("length").value = null;
      document.getElementById("mediafile").value = null;
    })
    .catch((err) => ("Error occured", err));
}

//show admin panel
adminLink.onclick = (e) => {
  e.preventDefault();
  //alert("Anna admin-salasana");
  const password = prompt("Anna admin salasana: ");
  if (password == "metka") {
    console.log("Oikein");
    closeVideoPlayer();
    closeAudioPlayer();
    playerSection.style.display = "none";
    pageHeader.innerHTML = "Lisää tai poista audio tai video";
    mediaList.innerHTML = "";
    formSection.style.display = "flex";
  } else {
    console.log("Väärin");
    alert("Emmit ei tunnista salasanaa!");
  }
};
//admin list audio
adminAudioBtn.onclick = (e) => {
  e.preventDefault();
  newMediaForm.style.display = "none";
  console.log("Admin listaa audio");
  getJSON(audioFiles, "admin");
};
//admin list video
adminVideoBtn.onclick = (e) => {
  e.preventDefault();
  newMediaForm.style.display = "none";
  console.log("Admin listaa videot");
  getJSON(videoFiles, "admin");
};
//admin add media
adminAddBtn.onclick = (e) => {
  e.preventDefault();
  console.log("Admin lisää media");
  storeMedia();
};
//admin leave
adminLeaveBtn.onclick = () => {
  window.location.reload();
};

//admin remove media
const removeMedia = (ind, med) => {
  let confirmRemo = confirm("Haluatko varmasti poistaa median?");
  if (confirmRemo == true) {
    //console.log("poistetaan", ind);
    let newJsonArray = media
      .slice(0, ind)
      .concat(media.slice(ind + 1, media.length));
    //console.log("json lopuksi", newJsonArray);
    const stringedJson = JSON.stringify(newJsonArray);
    const formData = new FormData();
    let removedList;
    formData.set("newjson", stringedJson);
    if (med == "vid") {
      formData.set("mediaformat", "video");
      removedList = videoFiles;
    }
    if (med == "mus") {
      formData.set("mediaformat", "audio");
      removedList = audioFiles;
    }

    fetch("http://localhost:3003/json", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        console.log(res);
        getJSON(removedList, "admin");
      })
      .catch((err) => ("Error occured", err));
  }
};

//play an audio and show audio title
function playAudio(media, name) {
  console.log("Kappale: " + name);
  songTitle.innerHTML = name;
  musicPlayer.src = `/media/${media}`;
  musicPlayer.play();
  playButton.style.display = "none";
  pauseButton.style.display = "block";
}
//play video
function playVideo(media, name) {
  pageHeader.innerHTML = name;
  mediaList.innerHTML = "";
  videoPlayerSection.style.display = "flex";
  videoWindow.load();
  videoSource.src = `/media/${media}`;
  sortingArea.style.display = "none";
}
//listeners
musicPlayer.addEventListener("timeupdate", updatetime);
songTimeLine.addEventListener("click", setTime);
volumeSlider.addEventListener("change", setVolume);
uploadButton.addEventListener("click", uploadFiles);
