// step1 요구사항 구현을 위한 전략
/*

TODO localStorage Read & Write
localStorage에 데이터를 저장한다.
  메뉴를 추가할 때
  메뉴를 수정할 때
  메뉴를 삭제할 때
localStorage에 저장된 데이터를 읽어온다.

TODO 카테고리별 메뉴판 관리
에스프레소 메뉴판 관리
프라푸치노 메뉴판 관리
블렌디드 메뉴판 관리
티바나 메뉴판 관리
디저트 메뉴판 관리

TODO 페이지 접근시 최초 데이터 Read & Rendering
페이지에 최초 접근할 때 localStorage에 에스프레소 메뉴를 읽어온다.
에스프레소 메뉴를 페이지에 그려준다.

TODO 품절 상태 관리
품절 버튼을 추가한다.
품절 버튼을 클릭하면 가장 가까운 li 태그의 class 속성 값에 sold-out 클래스를 추가한다.
품절 상태인 메뉴에 대한 정보를 localStorage에 저장한다.

*/

import { $ } from "./utils/dom.js";
import store from "./store/index.js"

function App() {
  // 상태(변할 수 있는 데이터) - 메뉴명
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };
  this.currentCategory = 'espresso';
  this.init = () => {
    if (store.getLocalStorage()) {
      this.menu = store.getLocalStorage();
    }
    render();
    initEventListeners();
  }

  const render = () => {
    const template = this.menu[this.currentCategory].map((item, index) => {
      return `
        <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name ${item.soldOut ? "sold-out" : ""}">${item.name}</span>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
          >
            품절
          </button>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
          >
            수정
          </button>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
          >
            삭제
          </button>
        </li>`
    }).join("");

    $("#menu-list").innerHTML = template;
    updateMenuCount();
  }

  const updateMenuCount = () => {
    $(".menu-count").innerText = `총 ${this.menu[this.currentCategory].length}개`
  }

  const addMenuName = () => {
    if ($("#menu-name").value === "") {
      alert("메뉴명을 입력해주세요.")
      return;
    }

    const MenuName = $("#menu-name").value;
    this.menu[this.currentCategory].push({ name: MenuName });
    store.setLocalStorage(this.menu);
    render();
    $("#menu-name").value = "";
  }

  const updateMenuName = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const updatedMenuName = prompt("바꿀 메뉴명을 설정해주세요.", $menuName.innerText)
    this.menu[this.currentCategory][menuId].name = updatedMenuName;
    store.setLocalStorage(this.menu);
    render();
  };

  const removeMenuName = (e) => {
    if (confirm("해당 메뉴를 삭제하시겠습니까?")) {
      const menuId = e.target.closest("li").dataset.menuId;
      this.menu[this.currentCategory].splice(menuId, 1);
      store.setLocalStorage(this.menu);
      render();
    };
  }

  const soldOutMenu = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    this.menu[this.currentCategory][menuId].soldOut = !this.menu[this.currentCategory][menuId].soldOut;
    store.setLocalStorage(this.menu);
    render();
  }

  const initEventListeners = () => {
    $("#menu-list").addEventListener("click", (e) => {
      if (e.target.classList.contains("menu-edit-button")) {
        updateMenuName(e);
        return;
      };

      if (e.target.classList.contains("menu-remove-button")) {
        removeMenuName(e);
        return;
      }

      if (e.target.classList.contains("menu-sold-out-button")) {
        soldOutMenu(e);
        return;
      }
    })

    $("#menu-form").addEventListener("submit", (e) => {
      e.preventDefault();
    })

    $("#menu-submit-button").addEventListener("click", addMenuName)

    $("#menu-name").addEventListener("keypress", (e) => {
      if (e.key !== "Enter") return;
      addMenuName();
    });

    $("nav").addEventListener("click", (e) => {
      const isCategoryButton = e.target.classList.contains("cafe-category-name")
      if (isCategoryButton) {
        const categoryName = e.target.dataset.categoryName;
        this.currentCategory = categoryName;
        $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`
        render();
      }
    })
  }
}

const app = new App();
app.init();



