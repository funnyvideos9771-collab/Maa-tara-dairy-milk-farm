fetch("https://docs.google.com/spreadsheets/d/1OxpiMXKY91fVpoSJbDZxmJCu9EeTe72z8AXaLkqF9hE/gviz/tq?tqx=out:json")
.then(res => res.text())
.then(rep => {

  let json = JSON.parse(rep.substring(47).slice(0, -2));

  let rows = json.table.rows;

  rows.forEach(r => {

    let n = r.c[0]?.v || "";
    let p = r.c[1]?.v || 0;
    let img = r.c[2]?.v || "https://via.placeholder.com/70";
    let status = (r.c[3]?.v || "yes").toString().toLowerCase();

    if(status === "yes"){
      document.getElementById("menu").innerHTML += `
      <div class="item">
        <img src="${img}">
        <div class="info">
          ${n}
          <small>₹${p}</small>
        </div>
        <div id="${n}">
          <div class="add-btn" onclick="add('${n}',${p})">ADD</div>
        </div>
      </div>`;
    }

  });

})
.catch(err => {
  console.log("Sheet Load Error:", err);
  document.getElementById("menu").innerHTML =
  "<p style='text-align:center;color:red'>Menu load nahi ho raha (Sheet error)</p>";
});
