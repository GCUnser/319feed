function createAndInsertHeader() {
    const headerHTML = `
  <div class="container">
    <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <a href="index.html" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"/></svg>
        <span class="fs-4" style="color:red"><strong>319Feed</strong></span>
      </a>
      <ul class="nav nav-pills">
        <li class="nav-item"><a href="index.html" class="nav-link" id="navQuizzes">Quizzes</a></li>
        <li class="nav-item"><a href="about.html" class="nav-link" id="navAbout">About</a></li>
      </ul>
    </header>
  </div>
  `;
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    setActiveNavLink();
  }
  
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const pageToNavId = {
      'index.html': 'navQuizzes',
      'about.html': 'navAbout',
    };
    const activeNavId = pageToNavId[currentPage];
    if (activeNavId && document.getElementById(activeNavId)) {
      document.getElementById(activeNavId).classList.add('active');
    }
  }
  
  function appendFooter() {
    const footerHTML = `
  <footer class="text-body-secondary py-5">
    <div class="container">
      <p class="float-end mb-1">
        <a href="#">Back to top</a>
      </p>
      <p class="mb-1">&copy; 319Feed</p>
      <p class="mb-1">By Gabriel Unser and Muralikrishna Patibandla</p>
      <p class="mb-0">Learn more about us <a href="./about.html">here</a>.</p>
    </div>
  </footer>
  `;
    document.body.innerHTML += footerHTML;
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    createAndInsertHeader();
    appendFooter();
  });