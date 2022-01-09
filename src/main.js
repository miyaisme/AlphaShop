// import './scss/main.scss'
const hamburger = document.querySelector('.hamburger')
const navList = document.querySelector('.list')
const nextBtn = document.querySelector('.next')
const firstBtn = document.querySelector('.first-next')
const backBtn = document.querySelector('.back')
const steps = document.querySelectorAll('.step')
const forms = document.querySelectorAll('.form')
const minusBtn = document.querySelector('.minus')
const plusBtn = document.querySelector('.plus')
let step = 0
let amount = 1

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

// nav漢堡排點擊
hamburger.addEventListener('click', hamburgerClicked)

// 下一步點擊
firstBtn.addEventListener('click', BtnClicked)
nextBtn.addEventListener('click', BtnClicked)
backBtn.addEventListener('click', BtnClicked)

// step 1 的初始狀態
if (step === 0) {
  firstBtn.classList.add('active')
  steps[step].classList.add('active')
  steps[step + 1].classList.add('d-none')
  steps[step + 2].classList.add('d-none')
  forms[step + 1].classList.add('d-none')
  forms[step + 2].classList.add('d-none')
}