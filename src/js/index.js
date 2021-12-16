// step1 요구사항 구현을 위한 전략
/*

TODO 메뉴 추가
메뉴의 이름을 입력 받고 확인 버튼을 누르면 메뉴가 추가된다.
메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
메뉴의 이름을 입력 받고 확인 버튼을 클릭으로 추가한다.
추가되는 메뉴의 아래 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.
총 메뉴 갯수를 count하여 상단에 보여준다.
메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
사용자 입력값이 빈 값이라면 추가되지 않는다.

TODO 메뉴 수정
메뉴의 수정 버튼을 눌러 메뉴 이름 수정 모달창을 제공한다. (prompt)
메뉴 수정 모달창에 입력 받은 신규 메뉴명을 입력 받고, 확인 버튼을 누르면 업데이트된다.

TODO 메뉴 삭제
메뉴 삭제 버튼을 누르면 confirm 모달창이 나온다.
확인 버튼 클릭시 메뉴가 삭제된다.
총 메뉴 수는 재설정된다

*/

const $ = (selector) => document.querySelector(selector);

function App() {

  const updateMenuCount = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount}개`
  }

  const addMenuName = () => {
    if ($("#espresso-menu-name").value === "") {
      alert("메뉴명을 입력해주세요.")
      return;
    }

    const espressoMenuName = $("#espresso-menu-name").value
    const menuItemTemplate = (espressoMenuName) => {
      return `
        <li class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
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
    }
    $("#espresso-menu-list").insertAdjacentHTML('beforeend', menuItemTemplate(espressoMenuName));
    updateMenuCount();
    $("#espresso-menu-name").value = "";
  }

  const updateMenuName = (e) => {
    const $menuName = e.target.closest("li").querySelector(".menu-name")
    const updatedMenuName = prompt("바꿀 메뉴명을 설정해주세요.", $menuName.innerText)
    $menuName.innerText = updatedMenuName;
  };

  const removeMenuName = (e) => {
    if (confirm("해당 메뉴를 삭제하시겠습니까?")) {
      e.target.closest("li").remove();
      updateMenuCount();
    };
  }

  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenuName(e);
    };

    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuName(e);
    }
  })

  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  })

  $("#espresso-menu-submit-button").addEventListener("click", addMenuName)

  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") return;
    addMenuName();
  });
}

App();



