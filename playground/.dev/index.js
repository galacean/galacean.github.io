import "./index.sass";
import demoList from "./mpa/.demoList.json";
const itemListDOM = document.getElementById("itemList");
const searchBarDOM = document.getElementById("searchBar");
const fullScreenDOM = document.getElementById("fullScreen");
const iframe = document.getElementById("iframe");
const items = []; // itemDOM,label

Object.keys(demoList).forEach((group) => {
  const demos = demoList[group];
  const groupDOM = document.createElement("div");
  const titleDOM = document.createElement("div");
  const demosDOM = document.createElement("ul");

  titleDOM.innerHTML = group;
  titleDOM.classList.add("title");
  itemListDOM.appendChild(groupDOM);
  groupDOM.appendChild(titleDOM);
  groupDOM.appendChild(demosDOM);

  demos.forEach((item) => {
    const { label, src } = item;
    const itemDOM = document.createElement("a");

    itemDOM.innerHTML = label;
    itemDOM.title = `${src}`;
    itemDOM.onclick = function () {
      clickItem(itemDOM);
    };
    demosDOM.appendChild(itemDOM);

    items.push({
      itemDOM,
      label,
      src
    });
  });
});

searchBarDOM.oninput = () => {
  updateFilter(searchBar.value);
};

fullScreenDOM.onclick = () => {
  const itemName = location.hash.split("#mpa/")[1];

  if (itemName) {
    location.href = location.origin + `/mpa/${itemName}.html`;
  }
};

function updateFilter(value) {
  const reg = new RegExp(value, "i");

  items.forEach(({ itemDOM, label, src }) => {
    reg.lastIndex = 0;
    if (reg.test(label) || reg.test(src)) {
      itemDOM.classList.remove("hide");
    } else {
      itemDOM.classList.add("hide");
    }
  });
}

function clickItem(itemDOM) {
  window.location.hash = `#mpa/${itemDOM.title}`;
}

function onHashChange() {
  const hashPath = window.location.hash.split("#")[1];
  if (!hashPath) {
    clickItem(items[0].itemDOM);
    return;
  }

  iframe.src = hashPath + ".html";

  items.forEach(({ itemDOM }) => {
    const itemPath = `mpa/${itemDOM.title}`;
    if (itemPath === hashPath) {
      itemDOM.classList.add("active");
    } else {
      itemDOM.classList.remove("active");
    }
  });
}

window.onhashchange = onHashChange;

// init
onHashChange();
