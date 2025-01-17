export let darkmode = localStorage.getItem('darkmode');
export const themeSwitch = document.getElementById('themeSwitch');

export const enableDarkmode = () => {
  document.body.classList.add('darkmode')
  localStorage.setItem('darkmode', 'active')
};

export const disableDarkmode = () => {
  document.body.classList.remove('darkmode')
  localStorage.setItem('darkmode', null)
};

if (darkmode === 'active') enableDarkmode();

export const setupDarkmodeListener = () => {
  themeSwitch.addEventListener('click', () => {
    darkmode = localStorage.getItem('darkmode')
    darkmode !== 'active' ? enableDarkmode() : disableDarkmode()
  })
};