// import './scss/main.scss'

const hamburger = document.querySelector('.hamburger')
const navList = document.querySelector('.list')
const nextBtn = document.querySelector('.next')
const firstBtn = document.querySelector('.first-next')
const backBtn = document.querySelector('.back')
const steps = document.querySelectorAll('.step')
const forms = document.querySelectorAll('.form')
const products = document.querySelector('.product-container')
const totalPrice = document.querySelector('.final-price')
let step = 0

// 商品資料
const datas = [
  {
    id: "1",
    name: "破壞補釘修身牛仔褲",
    image: "product_image_1",
    amount: 1,
    price: 3999,
    prices: 3999,
  },
  {
    id: "2",
    name: "刷色直筒牛仔褲",
    image: "product_image_2",
    amount: 1,
    price: 1299,
    prices: 1299,
  },
]

  // 渲染購物車商品畫面
  ; (function() {
    let sum = 0
    datas.forEach((data) => {
      products.innerHTML += `
      <div class="product-panel mb-4">
              <div class="image-container">
                <img class="product-image" src="/image/${data.image}@2x.png" alt="#">
              </div>
              <div class="product-content">
                <div class="product-info">
                  <div class="product-name">${data.name}</div>
                </div>
                <div class="product-amount">
                  <div data-id="${data.id}" class="minus"></div>
                  <p data-id="${data.id}" class="amount">${data.amount}</p>
                  <div data-id="${data.id}" class="plus"></div>
                </div>
                <div class="product-price">
                  <div data-id="${data.id}" class="price">$${data.prices}</div>
                </div>
              </div>
            </div>
    ` 
    sum += data.prices
  })
    totalPrice.innerText += `
      $ ${sum}
      `
  })()

function hamburgerClicked() {
  if (navList.classList.contains('d-none')) {
    navList.classList.remove('d-none')
  } else {
    navList.classList.add('d-none')
  }
}

//上一步&下一步
function BtnClicked(e) {
  const nowStep = steps[step]
  e.preventDefault()
  if (e.target.matches('.next')) {
    const nextStep = steps[step + 1]
    if (step === 0) {
      firstBtn.classList.add('d-none')
    }
    nowStep.classList.remove('active')
    nowStep.classList.add('checked')
    nextStep.classList.add('active')
    forms[step].classList.add('d-none')
    forms[step + 1].classList.toggle('d-none')
    step = step + 1
  } else if (e.target.matches('.back')) {
    const beforeStep = steps[step - 1]
    nowStep.classList.remove('active')
    beforeStep.classList.remove('checked')
    beforeStep.classList.add('active')
    forms[step].classList.toggle('d-none')
    forms[step - 1].classList.toggle('d-none')
    step = step - 1
  }
  judgeStep()
}

// 判斷step到最底或最前做其他處理
function judgeStep() {
  if (step === 0) {
    firstBtn.classList.remove('d-none')
  }
  if (step === 2) {
    nextBtn.innerText = "確認下單"
    nextBtn.setAttribute('disabled', 'disabled')
  } else {
    nextBtn.innerText = "→ 下一步"
    nextBtn.removeAttribute('disabled')
  }
}

// 商品數量增減
function adjustAmount(e) {
  const minusBtns = document.querySelectorAll('.minus')
  const plusBtns = document.querySelectorAll('.plus')
  const productAmounts = document.querySelectorAll('.amount')
  const prices = document.querySelectorAll('.price')
  const i = e.target.dataset.id - 1
  let amount = productAmounts[i].innerText
  if (e.target.dataset.id === minusBtns[i].dataset.id && e.target.classList.contains('minus')) {
    //調整商品數量
    productAmounts[i].innerText = Number(amount) - 1
    //調整商品總價
    datas[i].prices = (Number(amount) - 1) * Number(datas[i].price)
    prices[i].innerText = "$" + datas[i].prices
    if (amount <= 1) {
      productAmounts[i].innerText = 1
      prices[i].innerText = "$" + datas[i].price
      datas[i].prices = datas[i].price
    }
  } else if (e.target.dataset.id === plusBtns[i].dataset.id && e.target.classList.contains('plus')) {
    productAmounts[i].innerText = Number(amount) + 1
    datas[i].prices = (Number(amount) + 1) * Number(datas[i].price)
    prices[i].innerText = "$" + datas[i].prices
  }
  let finalPrice = 0
  for (let i = 0; i < datas.length; i++) {
    finalPrice += datas[i].prices
  }
  //調整所有商品的小計價格
  totalPrice.innerText = "$" + finalPrice
}

// nav漢堡排點擊
hamburger.addEventListener('click', hamburgerClicked)

// 下一步點擊
firstBtn.addEventListener('click', BtnClicked)
nextBtn.addEventListener('click', BtnClicked)
backBtn.addEventListener('click', BtnClicked)
// 商品數量增減
products.addEventListener('click', adjustAmount)

// step 1 的初始狀態
if (step === 0) {
  firstBtn.classList.add('active')
  steps[step].classList.add('active')
  steps[step + 1].classList.add('d-none')
  steps[step + 2].classList.add('d-none')
  forms[step + 1].classList.add('d-none')
  forms[step + 2].classList.add('d-none')
}
