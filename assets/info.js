const correctionButtons = document.querySelectorAll('.correction-button');
correctionButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();

    const wrapperContentButton = button.parentElement.parentElement;
    wrapperContentButton.style.display = 'none'; // .wrapper-content-button 숨기기

    const editForm = wrapperContentButton.nextElementSibling;
    editForm.style.display = 'block'; // 수정 폼 표시
  });
});
