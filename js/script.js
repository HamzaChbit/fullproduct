let title = document.getElementById("title");
let pirce = document.getElementById("pirce");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;

//get total

function getTotal() {
  if (pirce.value != "") {
    let result = +pirce.value + +taxes.value + +ads.value - +discount.value;
    total.innerText = result;
    total.style.background = "green";
  } else {
    total.innerText = "";
    total.style.background = "red";
  }
}

//create product
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    pirce: pirce.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  }

    if(title.value != '' && pirce.value != "" && category.value != ""
          ){
        if (mood === "create") {
            if (newPro.count > 1) {
              for (let i = 0; i < newPro.count; i++) {
                dataPro.push(newPro);
              }
            } else {
              dataPro.push(newPro);
            }
          } else {
            dataPro[tmp] = newPro;
            mood = "create";
            submit.innerHTML = "Create";
            count.style.display = "block";
          }
          clearData();
    }





  //localStorage
  localStorage.setItem("product", JSON.stringify(dataPro));


  showData();
};

//clear inputs
function clearData() {
  title.value = "";
  pirce.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

//read

function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].pirce}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td>
        <button  onclick="updateData(${i})"  id="update" >update</button>
        </td>
        <td>
        <button onclick="deleteData(${i})"  id="delete" >delete</button>
        </td>
        

        </tr>
    `;
  }

  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");

  if (dataPro.length > 0) {
    btnDelete.innerHTML = `
        <button onclick="deleteAll()" >delete All(${dataPro.length})  </button>`;
  } else {
    btnDelete.innerHTML = "";
  }
}
showData();

//delete

function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}
//delete all

function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}

//update

function updateData(i) {
  title.value = dataPro[i].title;
  pirce.value = dataPro[i].pirce;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal();
  category.value = dataPro[i].category;
  count.style.display = "none";
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//search
let searchMood = "title";

function getSearchMood(id) {
  let search = document.getElementById("search");

  if (id == "searchTitle") {
    searchMood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "category";
    search.placeholder = "Search By Category ";
  }
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `
                <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].pirce}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td>
                <button  onclick="updateData(${i})"  id="update" >update</button>
                </td>
                <td>
                <button onclick="deleteData(${i})"  id="delete" >delete</button>
                </td>
                
        
                </tr>
            `;
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `
                <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].pirce}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td>
                <button  onclick="updateData(${i})"  id="update" >update</button>
                </td>
                <td>
                <button onclick="deleteData(${i})"  id="delete" >delete</button>
                </td>
                
        
                </tr>
            `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

//clean data
