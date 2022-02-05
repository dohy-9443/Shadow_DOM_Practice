class shadowPrac extends HTMLElement {
  constructor() {
    super();
  }

  // 자동 HTML 재 렌더링기능 구현가능
  connectedCallback() {
    this.render();
  }

  render() {

    // shadow DOM 시작       
    this.attachShadow({
      mode: 'open'
    });

    // shadow root 라는 공간 생성 후 html 태그들 숨기기
    this.shadowRoot.innerHTML = `
      <header class="header">
        <ul>
          <li>
            <a class='link' href='javascript:void(0)'>테스트1</a>
            <ul>
              <li><a class='link' href='javascript:void(0)'>sub1</a></li>
              <li><a class='link' href='javascript:void(0)'>sub1</a></li>  
              <li><a class='link' href='javascript:void(0)'>sub1</a></li>  
            </ul>
          
          </li>
          <li><a class='link' href='javascript:void(0)'>테스트2</a></li>
          <li><a class='link' href='javascript:void(0)'>테스트3</a></li>
          <li><a class='link' href='javascript:void(0)'>테스트4</a></li>
          <li><a class='link' href='javascript:void(0)'>테스트5</a></li>
        </ul>
      </header>

      <style>
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
      </style>
    `;
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