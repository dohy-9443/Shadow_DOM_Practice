class shadowPrac extends HTMLElement {
  constructor() {
    super();

    this.count = 0;
    this.bool= false;
    this.text = '텍스트'
    this.popupText = '';
    
    // 스타일
    const style = `
      * { margin: 0; padding: 0; }
      ul, li { list-style: none; }
      a { text-decoration: none; color: #333; }
      h2 { color: red; }
      header { width: 100%; height: 100px; position: fixed; top: 0; left: 0; z-index: 1; }
      ul { width: 100%; height: 100%; display: flex; }
      li { width: 100%; height: 100%; background: green; border-right: 1px solid #fff; }
      li:last-child { border-right: none; }
      a { display: flex; width: 100%; height: 100%; color: #fff; justify-content: center; align-items: center; }

      ul > li > ul { display: none; transition: all 0.3s; }
      ul > li > ul > li { background: tan; border-right: none; border-bottom: 1px solid red; }

      ul > li:hover > ul { display: block; }

      .button-group { 
        width: 550px; height: 200px;
        display: flex; justify-content: center; align-items: center;
        margin: 200px auto 0;
      }

      button { 
        width: 200px; height: 100%;
        border: none; outline: none; border-radius: 20px;
        display: flex; justify-content: center; align-items: center;
        color: #fff; font-size: 25px; font-weight: bold;
      }

      .count {
        display: flex; justify-content: center; align-items: center;
        width: 100px; height: 100%;
        background: #FCA400; border-radius: 20px;
        color: #FFF; font-size: 30px; font-weight: bold;
        margin: 0 20px;
      }

      .dec {
        background: #FF0000;
      }

      .inc {
        background: #0000FF;
      }

      .popup-container {
        position: fixed; top: 0; left: 0; z-index: 2;
        width: 100vw; height: 100vh;
        background: rgba(0,0,0,0.5);
        overflow: hidden;
        display: flex; justify-content: center; align-items: center;
        display: none;
      }

      .popup-wrap {
        width: 680px;
        background: #FFF;
        border-radius: 10px;
        padding: 63px 0 30px;
      }

      .popup-title {
        font-size: 20px; font-weight: 300; 
        color: #222222; text-align: center;
        margin-bottom: 43px;
      }

      .popup-btn {
        display: block;
        width: 185px;
        background: #FCA400; border-radius: 7px;
        font-size: 16px; font-weight: bold; color: #FFF;
        padding: 13px 0; margin: 0 auto;
        cursor: pointer;
      }
    `;

    // 태그
    const html = `
      <header class="header">
        <ul>
          <li>
            <a class='link' href='javascript:void(0)'>테스트1</a>
            <ul>
              <li><a class='link' href='./main.html'>sub1</a></li>
              <li><a class='link' href='javascript:void(0)'>sub1</a></li>  
              <li><a class='link' href='javascript:void(0)'>sub1</a></li>  
            </ul>
          
          </li>
          <li><a class='link' href='./index.html'>테스트2</a></li>
          <li><a class='link text' href='javascript:void(0)'>${this.text}</a></li>
          <li><a class='link popup1' href='javascript:void(0)'>팝업1</a></li>
          <li><a class='link popup2' href='javascript:void(0)'>팝업2</a></li>
        </ul>
      </header>

      <div class='button-group'>
        <button class='dec'>-</button>
        <div class='count'>${this.count}</div>
        <button class='inc'>+</button>
      </div>

      <div class='popup-container'>
        <div class='popup-wrap'>
          <h2 class='popup-title'>${this.popupText}</h2>
          <button type='button' class='popup-btn'>확인</button>
        </div>
      </div>
    `;

    // shadow dom open
    this.attachShadow({ mode: 'open' });

    // shadow dom 공간 생성 후 html 추가 
    this.shadowRoot.innerHTML = `
      <style>
        ${style}
      </style>
      ${html}
    `;

    // shadowRoot 선언

    this.buttonInc = this.shadowRoot.querySelector('.inc')
    this.buttonDec = this.shadowRoot.querySelector('.dec')
    this.spanValue = this.shadowRoot.querySelector('.count')
    this.textChange = this.shadowRoot.querySelector('.text')
    this.popupOne = this.shadowRoot.querySelector('.popup1')
    this.popupTwo = this.shadowRoot.querySelector('.popup2')
    this.popupToggle = this.shadowRoot.querySelector('.popup-container')
    this.popupTitle = this.shadowRoot.querySelector('.popup-title')
    this.popupBtn = this.shadowRoot.querySelector('.popup-btn')

    // bind 

    this.inc = this.inc.bind(this)
    this.dec = this.dec.bind(this)

    this.changeT = this.changeT.bind(this)

    this.popupTextOne = this.popupTextOne.bind(this)
    this.popupTextTwo = this.popupTextTwo.bind(this)
    this.popupClose = this.popupClose.bind(this)
  }

  // 
  
  inc() {
    this.count++;
    this.update();
  }

  dec() {
    this.count--;
    this.update()
  }

  changeT() {
    this.bool = !this.bool
    this.update2()
  }

  popupTextOne() {
    this.popupText = '나는 팝업 1에 해당하는 텍스트';
    this.textUpdate()
  }
  
  popupTextTwo() {
    this.popupText = '나는 팝업 2에 해당하는 텍스트';
    this.textUpdate()
  }

  popupClose() {
    this.btn();
  }

  btn() {
    this.popupToggle.style.display = 'none'
  }


  update() {
    this.spanValue.innerText = this.count;
  }

  update2() {
    if (this.bool) {
      this.text = '바뀐텍스트'
      this.textChange.innerText = this.text
    } else {
      this.text = '텍스트'
      this.textChange.innerText = this.text
    }
  }

  textUpdate() {
    this.popupTitle.innerText = this.popupText
    this.popupToggle.style.display = 'flex'
  }

  // 자동 HTML 재 렌더링기능 구현가능
  connectedCallback() {
    this.buttonInc.addEventListener('click', this.inc);
    this.buttonDec.addEventListener('click', this.dec);
    this.textChange.addEventListener('click', this.changeT);
    this.popupOne.addEventListener('click', this.popupTextOne);
    this.popupTwo.addEventListener('click', this.popupTextTwo);
    this.popupBtn.addEventListener('click', this.popupClose);
  }

  disconnectedCallback() {
    this.buttonDec.removeEventListener('click', this.dec);
    this.buttonInc.removeEventListener('click', this.inc);
    this.textChange.removeEventListener('click', this.changeT);
    this.popupOne.removeEventListener('click', this.popupTextOne);
    this.popupTwo.removeEventListener('click', this.popupTextTwo);
    this.popupBtn.removeEventListener('click', this.popupClose);
  }


  // 이런 attribute가 바뀌는지 감시
  // static get observedAttributes() {
  //   return false;
  // }

  // 바뀌면 이거 실행 (hook 기능)
  // attributeChangedCallback() {

  // }
}

customElements.define('custom-header', shadowPrac)

// const headerEl = document.createElement('custom-header');

// document.body.append(headerEl)