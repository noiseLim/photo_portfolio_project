window.addEventListener('DOMContentLoaded', () => {
    
    //tabs
    
    const tabsParent = document.querySelector('.tabheader__items'),
          tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');

        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
        
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // timer

    const deadline = '2020-12-31';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor(t / (1000 * 60 * 60) % 24),
              minutes = Math.floor(t /(1000 * 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            if (num <= 0) {
                return `00`;
            } else {
                return num;
            }
        } 
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }

    }

    setClock('.timer', deadline);

    // modal studio

    const modalBlock = document.querySelector('.modal_studio'),
          modalContent = document.querySelectorAll('[data-foto]');
          

    function openModalFoto() {
        modalBlock.classList.add('show');
        modalBlock.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        // modalBlock.style.display = 'block';
        // modalBlock.style.display = 'none';
    }

    function closeModalFoto() {
        modalBlock.classList.add('hide');
        modalBlock.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalContent.forEach(btn => {
        btn.addEventListener('click', openModalFoto);
    });

    modalBlock.addEventListener('click', (e) => {
        if (e.target === modalBlock) {
            closeModalFoto();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalBlock.classList.contains('show')) {
            closeModalFoto();
        }
    });

    // slider

    const slides = document.querySelectorAll('.studio__slide'),
          slider = document.querySelector('.studio__slider'),
          prev = document.querySelector('.studio__slider-prev'),
          next = document.querySelector('.studio__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.studio__slider-wrapper'),
          slidesField = document.querySelector('.studio__slider-inner'),
          width = window.getComputedStyle(slider).width;
        //   width = window.getComputedStyle(slidesWrapper).getPropertyValue('width');
        //   width = '800px';

    let slideIndex = 1,
        offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function opacityMode() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    function nilDecoration() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function widthMode(property) {
        return +property.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if (offset == widthMode(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += widthMode(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        nilDecoration();
        opacityMode();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = widthMode(width) * (slides.length - 1); 
        } else {
            offset -= widthMode(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        nilDecoration();
        opacityMode();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = widthMode(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            nilDecoration();
            opacityMode();
        });
    });





});