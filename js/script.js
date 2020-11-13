window.addEventListener('DOMContentLoaded', () => {

    // studio cards

    class StudioCards {
        constructor (src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = 'studio__item';
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img data-foto src=${this.src} alt=${this.alt}>
                <h3 class="studio__item-subtitle">${this.title}</h3>
                <div class="studio__item-descr">${this.descr}</div>
                <div class="studio__item-divider"></div>
                <div class="studio__item-price">
                    <div class="studio__item-cost">Price:</div>
                    <div class="studio__item-total"><span>${this.price}</span> rub/hour</div>
                </div>
            `;

            this.parent.append(element);

        }
    }

    new StudioCards(
        "images/A170_2.jpg",
        "A170",
        'Studio A170',
        "170 m2<br>Cyclorama 8х5 m<br>Power connector 32А<br>Power connector 63А<br>Make-up artist's workplace<br>4 x Profoto D1",
        3000,
        '.container_studio',
    ).render();
    
    new StudioCards(
        "images/A120_4.jpg",
        "A120",
        'Studio A120',
        "A room with white walls and a large cyclorama is a classic solution for a photo studio.<br><br>120 m2<br>Circular cyclorama 6x7 m<br>4 x Profoto D1<br>Ceilings 5m<br>Windows along the entire length of the hall<br>Spacious dedicated space for makeup artist work<br>Power connector 32A<br>Grunge wall, which effectively contrasts with the general interior of the hall<br>Audio system",
        2200,
        '.container_studio',
    ).render();

    new StudioCards(
        "images/A85_5.jpg",
        "A85",
        'Studio A85',
        "85 m2<br>Cyclorama 5x5 m<br>Profoto<br>Dark wood floors<br>Power connector 32А<br>Dedicated dressing area<br>Grunge wall from the time of the building<br>3 x Profoto D1",
        1700,
        '.container_studio',
    ).render();


    // slider foto

    class SliderCards {
        constructor (wrapper, alt, parentSelector, ...src) {
            this.wrapper = wrapper;
            this.src = src;
            this.alt = alt;
            this.parent = document.querySelector(parentSelector);
        }

        render() {
            const element = document.createElement('div');

            element.classList.add('studio__slider-wrapper');

            element.innerHTML = `
                <div class="studio__slider-inner">
                    <div class=${this.wrapper}>
                        <img src=${this.src[0]} alt=${this.alt}>
                    </div>
                    <div class=${this.wrapper}>
                        <img src=${this.src[1]} alt=${this.alt}>
                    </div>
                    <div class=${this.wrapper}>
                        <img src=${this.src[2]} alt=${this.alt}>
                    </div>
                    <div class=${this.wrapper}>
                        <img src=${this.src[3]} alt=${this.alt}>
                    </div>
                    <div class=${this.wrapper}>
                        <img src=${this.src[4]} alt=${this.alt}>
                    </div>
                </div>                    
            `;
            this.parent.append(element);

            // this.src.forEach(item => {
            //     element.innerHTML = `
            //         <div class=${this.wrapper}>
            //             <img src=${item} alt=${this.alt}>
            //         </div>
            //     `;
            // });
        }
    }

    new SliderCards(
        "studio__slide",
        "FotoStudio_A170",
        ".studio__slider",
        "images/studio_A170/A170.jpg",
        "images/studio_A170/A170_2.jpg",
        "images/studio_A170/A170_3.jpg",
        "images/studio_A170/A170_4.jpg",
        "images/studio_A170/A170_5.jpg",
    ).render();

    new SliderCards(
        "studio__slide",
        "FotoStudio_A120",
        ".studio__slider",
        "images/studio_A120/A120.jpg",
        "images/studio_A120/A120_2.jpg",
        "images/studio_A120/A120_3.jpg",
        "images/studio_A120/A120_4.jpg",
        "images/studio_A120/A120_5.jpg",
    ).render();

    new SliderCards(
        "studio__slide",
        "FotoStudio_A85",
        ".studio__slider",
        "images/studio_A85/A85.jpg",
        "images/studio_A85/A85_2.jpg",
        "images/studio_A85/A85_3.jpg",
        "images/studio_A85/A85_4.jpg",
        "images/studio_A85/A85_5.jpg",
    ).render();

   


    // modal studio

    const modalBlock = document.querySelector('.modal_studio'),
          modalContent = document.querySelectorAll('[data-foto]'),
          studioItem = document.querySelector('.container_studio');
          

    function openModalFoto() {
        modalBlock.classList.add('show');
        modalBlock.classList.remove('hide');
        document.body.style.overflow = 'hidden';

    }

    function closeModalFoto() {
        modalBlock.classList.add('hide');
        modalBlock.classList.remove('show');
        document.body.style.overflow = '';
    }
    openModalFoto();
    closeModalFoto();

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
          slidesWrapper = document.querySelectorAll('.studio__slider-wrapper'),
          slidesField = document.querySelectorAll('.studio__slider-inner'),
          getParent = document.querySelector('.studio__slide').parentElement.parentElement,
          width = window.getComputedStyle(slider).width;
        //   width = window.getComputedStyle(slidesWrapper).getPropertyValue('width');

    let slideIndex = 1,
        offset = 0;

    console.log(getParent);

    function getClassParent(cnt) {
        return `${cnt}` / slidesWrapper.length;

        // I know this terrible solution but I have not idea how this realization. 
        // Later I'm back this


        // if (getParent.classList.contains('show')) {
        // }
            
    }

    if (getClassParent(slides.length) < 10) {
        total.textContent = `0${getClassParent(slides.length)}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = getClassParent(slides.length);
        current.textContent = slideIndex;
    }

    slidesField.forEach(item => {
        item.style.width = 100 * getClassParent(slides.length) + '%';
        item.style.display = 'flex';
        item.style.transition = '0.5s all';

    });

    slidesWrapper.forEach(item => {
        item.style.overflow = 'hidden';
    });

    function hideSlider() {
        slidesWrapper.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });
        slides.forEach(item => {
            item.classList.remove('count');
        });
    }
    hideSlider();

    function showSlider(i = 0) {
        slidesWrapper[i].classList.add('show');
        slidesWrapper[i].classList.remove('hide');
        slides[i].classList.add('count');
    }
    showSlider();

    modalContent.forEach((item, i) => {
        item.addEventListener('click', () => {
            openModalFoto();
            hideSlider();
            showSlider(i);
        });
    });

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

    for (let i = 0; i < getClassParent(slides.length); i++) {
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
        if (getClassParent(slides.length) < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function widthMode(property) {
        return +property.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if (offset == widthMode(width) * (getClassParent(slides.length) - 1)) {
            offset = 0;
        } else {
            offset += widthMode(width);
        }

        slidesField.forEach(item => {
            item.style.transform = `translateX(-${offset}px)`;
            // if (modalBlock.classList.contains('hide')) {
            //     offset = 0;
            // }
        });

        if (slideIndex == getClassParent(slides.length)) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        nilDecoration();
        opacityMode();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = widthMode(width) * (getClassParent(slides.length) - 1); 
        } else {
            offset -= widthMode(width);
        }

        slidesField.forEach(item => {
            item.style.transform = `translateX(-${offset}px)`;
            // if (modalBlock.classList.contains('hide')) {
            //     offset = 0;
            // }
        });

        if (slideIndex == 1) {
            slideIndex = getClassParent(slides.length);
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

            slidesField.forEach(item => {
                item.style.transform = `translateX(-${offset}px)`;
                // if (modalBlock.classList.contains('hide')) {
                //     offset = 0;
                // }
            });

            nilDecoration();
            opacityMode();
        });
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



});