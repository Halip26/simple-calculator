// Fungsi Solve yang menerima satu argumen val
function Solve(val) {
  // Ambil elemen HTML input dengan ID "res"
  let v = document.getElementById("res");
  // Tambahkan nilai argumen val ke nilai elemen input
  v.value += val;
}

// Fungsi Result yang tidak menerima argumen apapun
function Result() {
  // Ambil nilai elemen input dengan ID "res"
  let num1 = document.getElementById("res").value;
  // Evaluasi nilai elemen input sebagai ekspresi JavaScript menggunakan fungsi eval()
  let num2 = eval(num1);
  // Atur nilai elemen input menjadi hasil evaluasi
  document.getElementById("res").value = num2;
}

// Fungsi Clear yang tidak menerima argumen apapun
function Clear() {
  // Ambil elemen HTML input dengan ID "res"
  let inp = document.getElementById("res");
  // Bersihkan nilai elemen input
  inp.value = "";
}

// Fungsi Back yang tidak menerima argumen apapun
function Back() {
  // Ambil elemen HTML input dengan ID "res"
  let ev = document.getElementById("res");
  // Hapus karakter terakhir dari nilai elemen input
  ev.value = ev.value.slice(0, -1);
}
