const mouseTarget = document.getElementById('button');
mouseTarget.addEventListener('mouseenter', e => {
    mouseTarget.style.borderColor='#333333'; mouseTarget.style.backgroundColor='#333333'; mouseTarget.style.color='#ffffff';
});
mouseTarget.addEventListener('mouseleave', e => {
    mouseTarget.style.borderColor='#333333'; mouseTarget.style.backgroundColor='transparent'; mouseTarget.style.color='#333333'
});