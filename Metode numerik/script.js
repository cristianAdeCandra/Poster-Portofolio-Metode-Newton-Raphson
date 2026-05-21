function hitungNewton(){

  const H0 =
  parseFloat(
    document.getElementById('h0').value
  )

  const Ht =
  parseFloat(
    document.getElementById('ht').value
  )

  const t =
  parseFloat(
    document.getElementById('t').value
  )

  let r =
  parseFloat(
    document.getElementById('r0').value
  )

  // ================================
  // VALIDASI
  // ================================

  if(
    isNaN(H0) ||
    isNaN(Ht) ||
    isNaN(t) ||
    isNaN(r)
  ){

    alert(
      "Input tidak valid!"
    )

    return
  }

  // ================================
  // PARAMETER
  // ================================

  const toleransi =
  0.000001

  const maxIter =
  100

  // ================================
  // MODEL POLINOMIAL
  // H(t)=H0-r t²
  // ================================

  function f(r){

    return (
      H0
      -
      (r * Math.pow(t,2))
      -
      Ht
    )

  }

  // ================================
  // TURUNAN
  // ================================

  function fp(r){

    return (
      -Math.pow(t,2)
    )

  }

  let iterasi = 0

  let tableHTML = ""

  let dataGrafik = []

  while(iterasi < maxIter){

    let rLama = r

    let rBaru =
    r -
    (
      f(r) / fp(r)
    )

    // ============================
    // RELATIVE ERROR
    // ============================

    let error =
    Math.abs(
      (
        rBaru - rLama
      ) / rBaru
    )

    let status =
    error < toleransi
    ?
    "Konvergen"
    :
    "Lanjut"

    // ============================
    // TABEL ITERASI
    // ============================

    tableHTML += `

      <tr>

        <td>
          ${iterasi + 1}
        </td>

        <td>
          ${rLama.toFixed(8)}
        </td>

        <td>
          ${rBaru.toFixed(8)}
        </td>

        <td>
          ${error.toExponential(3)}
        </td>

        <td>
          ${status}
        </td>

      </tr>

    `

    dataGrafik.push(rBaru)

    if(
      error < toleransi
    ){

      r = rBaru

      break
    }

    r = rBaru

    iterasi++

  }

  // ================================
  // HASIL
  // ================================

  tampilkanHasil(
    r,
    iterasi,
    toleransi
  )

  document.getElementById(
    'tableNewton'
  ).innerHTML =
  tableHTML

  buatGrafik(
    dataGrafik
  )

  buatTabelProyeksi(
    H0,
    r
  )

}

// ====================================
// HASIL
// ====================================

function tampilkanHasil(
  r,
  iterasi,
  toleransi
){

  document.getElementById(
    'hasilNewton'
  ).innerHTML = `

    <h2>
      Statistik Hasil
    </h2>

    <p>

      Laju Deforestasi:
      <b>
        ${(r*100).toFixed(4)}%
      </b>

    </p>

    <p>

      Nilai r:
      <b>
        ${r.toFixed(8)}
      </b>

    </p>

    <p>

      Jumlah Iterasi:
      <b>
        ${iterasi + 1}
      </b>

    </p>

    <p>

      Toleransi:
      <b>
        ${toleransi}
      </b>

    </p>

  `
}

// ====================================
// GRAFIK
// ====================================

function buatGrafik(
  dataGrafik
){

  const ctx =
  document.getElementById(
    'chartNewton'
  )

  if(window.myChart){

    window.myChart.destroy()

  }

  window.myChart =
  new Chart(ctx,{

    type:'line',

    data:{

      labels:
      dataGrafik.map(
        (_,i)=>
        `Iterasi ${i+1}`
      ),

      datasets:[{

        label:
        'Konvergensi r',

        data:
        dataGrafik,

        borderColor:
        '#4ade80',

        backgroundColor:
        'rgba(74,222,128,0.2)',

        borderWidth:3,

        tension:0.4,

        fill:true

      }]

    },

    options:{

      responsive:true

    }

  })

}

// ====================================
// PROYEKSI TAHUNAN
// ====================================

function buatTabelProyeksi(
  H0,
  r
){

  let html = ""

  let tahunAwal = 2020

  for(
    let i=0;
    i<=20;
    i++
  ){

    let luasHutan =
    H0 -
    (
      r *
      Math.pow(i,2)
    )

    let turun =
    H0 - luasHutan

    html += `

      <tr>

        <td>
          ${tahunAwal+i}
        </td>

        <td>
          ${luasHutan.toFixed(2)}
          juta ha
        </td>

        <td>
          ${turun.toFixed(2)}
          juta ha
        </td>

      </tr>

    `

  }

  document.getElementById(
    'tabelProyeksi'
  ).innerHTML =
  html

}