// import './scss/main.scss'
const hamburger = document.querySelector('.hamburger')
const navList = document.querySelector('.list')
const nextBtn = document.querySelector('.next')
const firstBtn = document.querySelector('.first-next')
const backBtn = document.querySelector('.back')
const steps = document.querySelectorAll('.step')
const forms = document.querySelectorAll('.form')
const products = document.querySelector('.product-container')
const minusBtn = document.querySelector('.minus')
const plusBtn = document.querySelector('.plus')
const productAmount = document.querySelector('.amount')
const price = document.querySelector('.price')
const totalPrice = document.querySelector('.price')
let step = 0
let amount = 1

// 商品資料
const datas = [
  {
    id: "product-1",
    name: "破壞補釘修身牛仔褲",
    image: "product_image_1",
    amount: 1,
    price: 3999,
  },
  {
    id: "product-2",
    name: "刷色直筒牛仔褲",
    image: "product_image_2",
    amount: 1,
    price: 1299,
  },
]

  // 渲染購物車商品畫面
  ; (function () {
    let sum = 0
    datas.forEach((data) => {
      products.innerHTML += `
      <div id="${data.id}" class="product-panel mb-4">
              <div class="image-container">
                <img class="product-image" src="/image/${data.image}@2x.png" alt="#">
              </div>
              <div class="product-content">
                <div class="product-info">
                  <div class="product-name">${data.name}</div>
                </div>
                <div class="product-amount">
                  <div class="minus"></div>
                  <p class="amount">${data.amount}</p>
                  <div class="plus"></div>
                </div>
                <div class="product-price">
                  <div class="price">$${data.price}</div>
                </div>
              </div>
            </div>
    ` 
    sum += data.price
  })
    price.innerText += `
      $ ${sum}
      `
  })()

function sumPrice() {
  let sum = 0
  for (let i = 0; i < datas.length; i++) {
    datas.forEach((data) => {
      sum += datas.price
    }) 
  } 
}

function hamburgerClicked() {
  if (navList.classList.contains('d-none')) {
    navList.classList.remove('d-none')
  } else {
    navList.classList.add('d-none')
  }
}

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
  if (e.target.classList.contains('minus')) {
    amount = amount - 1
  } else if (e.target.classList.contains('plus')) {
    amount = amount + 1
  }
  if (amount <= 0) {
    amount = 0
  }
  productAmount.innerText = amount
}

// 複數商品總價
function adjustPrice(e) {
  // price.innerText = finalPrice
}

// nav漢堡排點擊
hamburger.addEventListener('click', hamburgerClicked)

// 下一步點擊
firstBtn.addEventListener('click', BtnClicked)
nextBtn.addEventListener('click', BtnClicked)
backBtn.addEventListener('click', BtnClicked)
// 商品數量增減
products.addEventListener('click', adjustAmount, adjustPrice)

// step 1 的初始狀態
if (step === 0) {
  firstBtn.classList.add('active')
  steps[step].classList.add('active')
  steps[step + 1].classList.add('d-none')
  steps[step + 2].classList.add('d-none')
  forms[step + 1].classList.add('d-none')
  forms[step + 2].classList.add('d-none')
}
