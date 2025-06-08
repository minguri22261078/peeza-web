/* ====================================
   [네비게이션 색상 전환 - style-guide 인식]
==================================== */
// 네비게이션 및 style-guide, features 요소 탐색
const nav = document.querySelector('.navigation');
const styleGuide = document.querySelector('.style-guide');
const features = document.querySelector('.features');
const flow = document.querySelector('.flow');
const desgin01 = document.querySelector('.desgin01');
const desgin02 = document.querySelector('.desgin02');
const desgin03 = document.querySelector('.desgin03');

// style-guide나 features 진입시 네비게이션 색상 변경 함수
function navColorToggle() {
  if (!nav) return;
  // style-guide, features, flow, desgin01, desgin02, desgin03가 있으면 감지
  let isDark = false;
  [styleGuide, features, flow, desgin01, desgin02, desgin03].forEach(section => {
    if (section) {
      const rect = section.getBoundingClientRect();
      const navHeight = nav.offsetHeight || 64;
      // section 상단이 네비 하단과 겹치면 -> nav-dark 클래스 추가
      if (rect.top <= navHeight && rect.bottom > navHeight) {
        isDark = true;
      }
    }
  });
  if (isDark) {
    nav.classList.add('nav-dark');
  } else {
    nav.classList.remove('nav-dark');
  }
}

// 스크롤, 리사이즈, 첫 진입시 적용
window.addEventListener('scroll', navColorToggle);
window.addEventListener('resize', navColorToggle);
window.addEventListener('DOMContentLoaded', navColorToggle);





/* ====================================
   [Hero 인트로 - 타이핑 애니메이션]
==================================== */
// 메인 타이틀 텍스트 타이핑 효과
const typingText = '<span class="hero__title-highlight">일상</span>을 나누고,<br /> 새로운 <span class="hero__title-highlight">인연</span>을 만드는 곳';
const title = document.querySelector('.hero__title');
if (title) {
  let i = 0, html = '';
  function typing() {
    if (i < typingText.length) {
      // 강조 span 처리
      if (typingText.slice(i, i + 6) === '<span') {
        let close = typingText.indexOf('</span>', i) + 7;
        html += typingText.slice(i, close);
        title.innerHTML = html.replace(/\n/g, '<br>');
        i = close;
      } else {
        html += typingText[i];
        title.innerHTML = html.replace(/\n/g, '<br>');
        i++;
      }
      setTimeout(typing, 60); // 타자 속도
    }
  }
  typing();
}



/* ====================================
   [백그라운드 이미지 페이드 인]
==================================== */
// 스크롤 시 이미지 페이드 인 처리
function fadeInImgOnScroll() {
  const img = document.querySelector('.background-overlay .element');
  if (!img) return;
  const rect = img.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  // 이미지의 85% 이상이 보이면 등장
  if (rect.top < windowHeight * 0.75) {
    img.classList.add('active');
  }
}
// 스크롤/로드 시 동작
window.addEventListener('DOMContentLoaded', fadeInImgOnScroll);
window.addEventListener('scroll', fadeInImgOnScroll);



/* ====================================
   [서비스 네이밍 - 글자 휠 인터랙션(촤라락)]
==================================== */
const words = [
  "허리", "가슴", "얼굴", "어깨", "다리",
  "주름", "형편", "인생", "팔자", "웃음"
];
let currentIndex = 0;
const wordSpan = document.querySelector('.service-naming .div .span');

if (wordSpan) {
  wordSpan.addEventListener('wheel', function(e) {
    // 페이드 아웃 효과
    wordSpan.classList.add('word-fade');
    setTimeout(() => {
      // 스크롤 방향에 따라 인덱스 이동
      if (e.deltaY > 0) currentIndex = (currentIndex + 1) % words.length;
      else currentIndex = (currentIndex - 1 + words.length) % words.length;
      wordSpan.textContent = words[currentIndex];
      // 페이드 인(클래스 해제)
      wordSpan.classList.remove('word-fade');
    }, 130);
    e.preventDefault();
  });
  wordSpan.style.cursor = "pointer";
}



/* ====================================
   [페르소나 이미지 애니메이션: 오른쪽에서 한 장씩 순차적으로 슬라이드 인]
==================================== */
function personaSlideIn() {
  const overlapGroup = document.querySelector('.persona .overlap-group');
  if (!overlapGroup) return;

  const imgs = overlapGroup.querySelectorAll('img');
  const rect = overlapGroup.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  if (rect.top < windowHeight * 0.85 && rect.bottom > 0) {
    // 한 장씩 순차적으로 애니메이션
    imgs.forEach((img, idx) => {
      setTimeout(() => {
        img.classList.add('active');
      }, idx * 400);
    });
  } else {
    // 뷰포트 밖으로 나가면 모두 제거
    imgs.forEach(img => img.classList.remove('active'));
  }
}
window.addEventListener('scroll', personaSlideIn);
window.addEventListener('DOMContentLoaded', personaSlideIn);



/* ====================================
   [페이드 & 슬라이드 인: desgin 섹션 진입시]
==================================== */
// 관리할 desgin 섹션 리스트 (필요시 추가만 하면 됨)
const desginSections = ['.desgin01', '.desgin02', '.desgin03'];

// 섹션 진입 시 .active 효과 부여 (스크롤/로드 모두)
function applySectionAppear() {
  desginSections.forEach(selector => {
    const el = document.querySelector(selector);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.82 && rect.bottom > 0;
    if (inView) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}
window.addEventListener('scroll', applySectionAppear);
window.addEventListener('DOMContentLoaded', applySectionAppear);

/* ====================================
   [마우스 트래킹 입체감 효과: desgin 섹션 이미지]
==================================== */
// desgin 섹션별로 .d 이미지에 효과 적용
function applyMouse3DEffect() {
  desginSections.forEach(selector => {
    const img = document.querySelector(`${selector} .d`);
    if (!img) return;
    img.addEventListener('mousemove', (e) => {
      const {width, height, left, top} = img.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / width * 8;
      const y = (e.clientY - top - height / 2) / height * 8;
      img.style.transform = `scale(1.04) rotateY(${x}deg) rotateX(${-y}deg)`;
    });
    img.addEventListener('mouseleave', () => {
      img.style.transform = '';
    });
  });
}
window.addEventListener('DOMContentLoaded', applyMouse3DEffect);



/* ====================================
   [그래프 등장 애니메이션 (차례로 촤촤촤) + 호버 반응 효과]
   - 마우스를 올리면 hovered 추가
   - 마우스를 떼면 hovered 즉시 제거(원래대로 복귀, transition 적용)
==================================== */
function showGraphOnScroll() {
  // 모든 .graph 요소 순회
  document.querySelectorAll('.graph').forEach(function(el, idx) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    // 등장 조건
    if (rect.top < windowHeight * 0.85 && rect.bottom > 0) {
      setTimeout(() => {
        el.classList.add('active');
      }, idx * 230); // 0, 230, 460... 한 칸씩 차례로!
      // 마우스 진입시 효과
      el.onmouseenter = function() {
        el.classList.add('hovered');
      };
      // 마우스 벗어날 때 효과 즉시 해제 (자연스럽게 복귀)
      el.onmouseleave = function() {
        el.classList.remove('hovered');
      };
    } else {
      el.classList.remove('active');
      el.classList.remove('hovered');
      el.onmouseenter = null;
      el.onmouseleave = null;
    }
  });
}
window.addEventListener('scroll', showGraphOnScroll);
window.addEventListener('DOMContentLoaded', showGraphOnScroll);


/* ====================================
   [Marquee 무한 슬라이드 효과]
   - 모든 .marquee-row에 대해 독립적, 유연하게 동작
   - li 개수, 속도, 반응형 리사이즈 자동 처리
==================================== */
function initMarqueeRows() {
  document.querySelectorAll('.marquee-row').forEach((row, idx) => {
    const liCount = row.children.length;

    // li들을 복제해서 2세트 더 붙여서 자연스럽게 무한 슬라이드
    for (let i = 0; i < liCount * 2; i++) {
      row.appendChild(row.children[i % liCount].cloneNode(true));
    }

    // 슬라이드 속도(줄마다 다르게)
    let pos = 0;
    const speed = 1 + idx * 0.25;

    // 한 세트의 전체 너비 계산 함수
    function getSetWidth() {
      let w = 0;
      for (let i = 0; i < liCount; i++) {
        w += row.children[i].offsetWidth;
      }
      return w + liCount * 36; // li margin(18px*2) 반영
    }
    let setWidth = getSetWidth();

    // 실제 애니메이션 루프
    function animate() {
      pos -= speed;
      if (Math.abs(pos) >= setWidth) pos = 0;
      row.style.transform = `translateX(${pos}px)`;
      requestAnimationFrame(animate);
    }

    // 리사이즈 시 setWidth 재계산
    window.addEventListener('resize', () => {
      setWidth = getSetWidth();
    });

    animate();
  });
}
window.addEventListener('DOMContentLoaded', initMarqueeRows);



/* ====================================
   [스타일가이드 이미지 등장 애니메이션]
   - IntersectionObserver로 한 장씩 페이드인
   - 타겟 이미지/옵션/콜백 모두 함수 및 변수로 분리
==================================== */
// 대상 이미지 선택자 배열 (필요시 이 부분만 수정!)
const styleGuideImgSelectors = [
  '.style-guide-logo',
  '.style-guide-colors',
  '.style-guide .img',
  '.style-guide .components-row .img-2'
];

// 한 번에 모든 대상 이미지 선택 (중복 제거)
const styleGuideImgs = [
  ...new Set(
      styleGuideImgSelectors.flatMap(sel => Array.from(document.querySelectorAll(sel)))
  )
];

// Observer 콜백
function styleGuideImgObserverCallback(entries) {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('is-visible');
      }, i * 220);
    } else {
      entry.target.classList.remove('is-visible');
    }
  });
}

// Observer 옵션 (threshold 등 필요시 조정)
const styleGuideImgObserverOptions = {
  threshold: 0.65
};

// Observer 인스턴스
const styleGuideImgObserver = new IntersectionObserver(
    styleGuideImgObserverCallback,
    styleGuideImgObserverOptions
);

// 이미지 별로 감지 시작
styleGuideImgs.forEach(img => styleGuideImgObserver.observe(img));



/* ====================================
   [section-snap: 특정 섹션에서만 한 화면씩 스크롤]
   - .section-snap 클래스를 가진 섹션에 진입했을 때만 휠로 한 번에 한 섹션씩 자연스럽게 이동
   - 나머지 구간에서는 일반 스크롤
==================================== */

/**
 * sectionSnapScroll
 * .section-snap가 붙은 모든 섹션에 대해 풀페이지 스크롤을 적용
 * (중앙에 해당 섹션이 있을 때만 한 섹션씩 스크롤)
 */
function sectionSnapScroll() {
  const sections = document.querySelectorAll('.section-snap');
  let isScrolling = false;

  window.addEventListener('wheel', function(e) {
    // 1) 현재 화면 중앙에 section-snap이 있는지 체크
    const curr = Array.from(sections).findIndex(sec => {
      const rect = sec.getBoundingClientRect();
      // 중앙선에 걸쳐있는 섹션
      return rect.top <= window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
    });
    // section-snap 구간이 아니라면 일반 스크롤
    if (curr === -1) return;
    if (isScrolling) return;

    let nextIdx = curr;
    if (e.deltaY > 0 && curr < sections.length - 1) nextIdx++;
    if (e.deltaY < 0 && curr > 0) nextIdx--;

    if (nextIdx !== curr) {
      isScrolling = true;
      sections[nextIdx].scrollIntoView({behavior: "smooth"});
      setTimeout(() => { isScrolling = false; }, 800); // 중복 방지
      e.preventDefault(); // 한 섹션씩만 이동하도록 기본 스크롤 막음
    }
  }, {passive: false});
}

// 페이지 최초 로드시 한 번만 실행
window.addEventListener('DOMContentLoaded', sectionSnapScroll);


/* ====================================
   [Hero 섹션 배경 이미지 자동 변경 + 페이드 전환]
==================================== */

// [1] 배경 이미지 경로 리스트(여기만 수정하면 이미지 교체 가능)
const HERO_BG_IMAGES = [
  'img/homeimage1.png',
  'img/homeimage2.png',
  'img/homeimage3.png'
];

// [2] 전환 간격(ms)
const HERO_BG_INTERVAL = 3000; // 3초

// [3] 페이드 효과 지속 시간(ms)
const HERO_BG_FADE_DURATION = 400;

let heroBgIndex = 0;
const heroSection = document.querySelector('.hero');

/**
 * 실제 Hero 섹션에 배경 이미지 적용 함수
 */
function setHeroBackground(idx) {
  if (!heroSection) return;
  heroSection.style.backgroundImage = `url('${HERO_BG_IMAGES[idx]}')`;
  heroSection.style.backgroundPosition = 'center center';
  heroSection.style.backgroundSize = 'cover';
}

/**
 * 배경 이미지 변경 및 페이드 효과 함수
 */
function changeHeroBgWithFade() {
  heroBgIndex = (heroBgIndex + 1) % HERO_BG_IMAGES.length;
  heroSection.classList.add('bg-fade');
  setTimeout(() => {
    setHeroBackground(heroBgIndex);
    heroSection.classList.remove('bg-fade');
  }, HERO_BG_FADE_DURATION);
}

// [4] 최초 1회 배경 적용
setHeroBackground(heroBgIndex);

// [5] 주기적으로 변경 (인터벌)
setInterval(changeHeroBgWithFade, HERO_BG_INTERVAL);