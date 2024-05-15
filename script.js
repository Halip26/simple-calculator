// Fungsi Solve yang menerima satu argumen val
function Solve(val) {
  // Ambil elemen HTML input dengan ID "inputResult"
  let v = document.getElementById("inputResult");
  // Tambahkan nilai argumen val ke nilai elemen input
  v.value += val;
}

// Fungsi Result yang tidak menerima argumen apapun
function Result() {
  // Ambil nilai elemen input dengan ID "inputResult"
  let num1 = document.getElementById("inputResult").value;

  // Replace percentage expressions with their evaluated values
  num1 = num1.replace(/(\d+(\.\d+)?)%/g, function (match, p1) {
    return (parseFloat(p1) / 100).toString();
  });

  // Evaluasi nilai elemen input sebagai ekspresi JavaScript menggunakan fungsi eval()
  let num2 = eval(num1);
  // Atur nilai elemen input menjadi hasil evaluasi
  document.getElementById("inputResult").value = num2;
}

// Fungsi Clear yang tidak menerima argumen apapun
function Clear() {
  // Ambil elemen HTML input dengan ID "inputResult"
  let inp = document.getElementById("inputResult");
  // Bersihkan nilai elemen input
  inp.value = "";
}

// Fungsi Back yang tidak menerima argumen apapun
function Back() {
  // Ambil elemen HTML input dengan ID "inputResult"
  let ev = document.getElementById("inputResult");
  // Hapus karakter terakhir dari nilai elemen input
  ev.value = ev.value.slice(0, -1);
}
