<?php require_once('resources/views/header.php'); ?>

<!-- preloader -->
<div id="preloader">
    <div class="outer">
        <div class="infinityChrome">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="infinity cl">
            <div>
                <span></span>
            </div>
            <div>
                <span></span>
            </div>
            <div>
                <span></span>
            </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="goo-outer">
            <defs>
                <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                    <feColorMatrix in="blur" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                    <feBlend in="SourceGraphic" in2="goo" />
                </filter>
            </defs>
        </svg>
    </div>
</div>

<!-- mobile header -->
<!-- <header class="mobile-header-1">
    <div class="container">
        <div class="menu-icon d-inline-flex mr-4">
            <button>
                <span></span>
            </button>
        </div>
        <div class="site-logo">
            <a href="index.html">
                CV Yoke Andreian Yudistiro <span class="text-danger font-weight-bolf">.</span>
            </a>
        </div>
    </div>
</header> -->

<!-- desktop left-->
<header class="desktop-header-1 d-flex align-items-start flex-column">
    <!-- logo images -->
    <a href="/" class="text-logo">
        Yoke A<span>.</span>
    </a>

    <!-- main nav -->
    <nav>
        <ul class="vertical-menu scrollspy">
            <li>
                <a href="#home" class="nav-link">
                    <i class="icon-home"></i>
                    Home
                </a>
            </li>
            <li>
                <a href="#about" class="nav-link">
                    <i class="icon-user-following"></i>
                    About
                </a>
            </li>
            <li>
                <a href="#service" class="nav-link">
                    <i class="icon-briefcase"></i>
                    Services
                </a>
            </li>
            <li>
                <a href="#experience" class="nav-link">
                    <i class="icon-graduation"></i>
                    Experience
                </a>
            </li>
            <li>
                <a href="#works" class="nav-link">
                    <i class="icon-layers"></i>
                    Work
                </a>
            </li>
            <li>
                <a href="#blog" class="nav-link">
                    <i class="icon-note"></i>
                    Blog
                </a>
            </li>
            <li>
                <a href="#contact" class="nav-link">
                    <i class="icon-bubbles"></i>
                    Contact
                </a>
            </li>
        </ul>
    </nav>

    <!-- footer -->
    <div class="footer">
        <!-- copyright -->
        <span class="copyright">&copy; 2020 Yoke Portfolio</span>
    </div>
</header>

<main class="content">

    <!-- section home -->
    <?php require_once('resources/views/main.php'); ?>

</main>
<?php require_once('resources/views/footer.php'); ?>