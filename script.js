document.addEventListener('DOMContentLoaded', () => {
  // HTML Template

  let template = `
  <div
    class="container"
    style="
      background: linear-gradient(
          to bottom,
          rgba(25, 25, 25, 0.65),
          rgba(25, 25, 25, 1) 75%
        ),
        url('{{background}}');
    "
  >
    <!-- NAME -->
    <div class="name">{{firstname}} <strong>{{lastname}}</strong></div>

    <!-- LINE -->
    <div class="line"></div>

    <!-- MENU -->
    <div class="menu" id="menu">
      <div
        class="btn"
        id="btn-desc1"
        d-target="desc1"
        d-next="2"
        d-prev="5"
      >
        <div class="title">Principal</div>
        <span class="th th-star"></span>
      </div>
      <div
        class="btn"
        id="btn-desc2"
        d-target="desc2"
        d-next="3"
        d-prev="1"
      >
        <div class="title">Desc. Física</div>
        <span class="th th-user"></span>
      </div>
      <div
        class="btn"
        id="btn-desc3"
        d-target="desc3"
        d-next="4"
        d-prev="2"
      >
        <div class="title">Desc. Psicológica</div>
        <span class="th th-heart-1"></span>
      </div>
      <div
        class="btn"
        id="btn-desc4"
        d-target="desc4"
        d-next="5"
        d-prev="3"
      >
        <div class="title">Historia</div>
        <span class="th th-hourglass"></span>
      </div>
      <div
        class="btn"
        id="btn-desc5"
        d-target="desc5"
        d-next="1"
        d-prev="4"
      >
        <div class="title">Extras</div>
        <span class="th th-push-pin"></span>
      </div>
    </div>

    <!-- OPEN BUTTON -->
    <div class="open" id="open-btn">
      <span class="th th-right-arrow"></span>
    </div>

    <!-- CONTENT -->
    <div class="content" id="content">
      <!-- AVATAR -->
      <div
        class="avatar"
        style="
          background: linear-gradient(
              to bottom,
              rgba(25, 25, 25, 0.65),
              rgba(25, 25, 25, 0.65)
            ),
            url('{{avatar}}');
        "
      >
        <span id="close-btn" class="close th th-cross-3-o"></span>
      </div>

      <!-- TITLE -->
      <div class="title" id="title">{{title}}</div>

      <!-- DESCRIPTION -->
      <div class="description" id="description">
        {{description}}
      </div>

      <!-- PREVIOUS -->
      <div class="prev" id="prev-btn">
        <span class="th th-left-arrow"></span>
      </div>

      <!-- NEXT -->
      <div class="next" id="next-btn">
        <span class="th th-right-arrow"></span>
      </div>
    </div>
  </div>
  `;

  // Root Element
  const root = document.querySelector('#pk-primal-template');

  // ===================================================== DATA

  // Data
  const data = {
    template: {
      '{{firstname}}': root.getAttribute('d-firstname') || 'Nombre',
      '{{lastname}}': root.getAttribute('d-lastname') || 'Apellido',
      '{{avatar}}':
        root.getAttribute('d-avatar') || 'https://placehold.it/190x190',
      '{{background}}':
        root.getAttribute('d-background') || 'https://placehold.it/350x650'
    },
    main: {
      '{{age}}': root.getAttribute('d-age') || '---',
      '{{sex}}': root.getAttribute('d-sex') || '---',
      '{{origin}}': root.getAttribute('d-origin') || '---',
      '{{class}}': root.getAttribute('d-class') || '---',
      '{{faction}}': root.getAttribute('d-faction') || '---',
      '{{starter}}': root.getAttribute('d-starter') || '---',
      '{{pack}}': root.getAttribute('d-pack') || '---'
    }
  };

  // Titles
  const titles = {
    desc1: 'Principal',
    desc2: 'Desc. Física',
    desc3: 'Desc. Psicológica',
    desc4: 'Historia',
    desc5: 'Extras'
  };

  // Main fields
  let mainFields = `
  <ul>
    <li><strong>Edad:</strong> {{age}}</li>
    <li><strong>Sexo:</strong> {{sex}}</li>
    <li><strong>Origen:</strong> {{origin}}</li>
    <li><strong>Clase Social:</strong> {{class}}</li>
    <li><strong>Facción:</strong> {{faction}}</li>
    <li><strong>Pokémon Inicial:</strong> {{starter}}</li>
    <li><strong>Pack:</strong> {{pack}}</li>
  </ul>
  `;

  // Descriptions
  const descriptions = {
    desc1: root.getAttribute('d-desc1'),
    desc2: root.getAttribute('d-desc2'),
    desc3: root.getAttribute('d-desc3'),
    desc4: root.getAttribute('d-desc4'),
    desc5: root.getAttribute('d-desc5')
  };

  // ===================================================== GENERATOR

  // Main fields
  Object.keys(data.main).forEach((k) => {
    mainFields = mainFields.replace(k, data.main[k]);
  });

  Object.keys(descriptions).forEach((k) => {
    if (descriptions[k] === null) {
      return (descriptions[k] = '---');
    }

    return (descriptions[k] = descriptions[k].replace(
      /(?:\r\n|\r|\n)/g,
      '<br/>'
    ));
  });

  descriptions.desc1 = mainFields + descriptions.desc1;

  // Template
  Object.keys(data.template).forEach((k) => {
    template = template.replace(k, data.template[k]);
  });

  root.innerHTML = template;

  // ===================================================== HANDLERS
  const menu = document.querySelector('#menu');
  const btns = [...document.querySelectorAll('div[id^=btn-desc]')];
  const openBtn = document.querySelector('#open-btn');
  const prevBtn = document.querySelector('#prev-btn');
  const nextBtn = document.querySelector('#next-btn');
  const closeBtn = document.querySelector('#close-btn');
  const contentDiv = document.querySelector('#content');

  // Display the menu
  openBtn.addEventListener('click', () => {
    const classes = [...menu.classList];

    if (classes.includes('active')) {
      menu.classList.remove('active');
      openBtn.classList.remove('active');
    } else {
      menu.classList.add('active');
      openBtn.classList.add('active');
    }
  });

  // Close the content
  closeBtn.addEventListener('click', () => {
    contentDiv.classList.remove('active');
  });

  // Title replacer
  const titleReplacer = (replacement) => {
    const title = titles[replacement] || 'Título';
    const titleDiv = document.querySelector('#title');
    titleDiv.innerHTML = title;
  };

  // Description replacer
  const descriptionReplacer = (replacement) => {
    const description = descriptions[replacement] || 'Descripción';
    const descriptionDiv = document.querySelector('#description');
    descriptionDiv.innerHTML = description;
  };

  // Buttons
  let current = '';
  let prev = '';
  let next = '';

  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('d-target');

      current = target;
      prev = btn.getAttribute('d-prev');
      next = btn.getAttribute('d-next');

      // Open the content
      contentDiv.classList.add('active');

      // Replace content's title
      titleReplacer(target);
      descriptionReplacer(target);
    });
  });

  // Prev
  prevBtn.addEventListener('click', () => {
    titleReplacer(`desc${prev}`);
    descriptionReplacer(`desc${prev}`);

    const btn = document.querySelector(`#btn-desc${prev}`);
    const target = btn.getAttribute('d-target');

    current = target;
    prev = btn.getAttribute('d-prev');
    next = btn.getAttribute('d-next');
  });

  // Next
  nextBtn.addEventListener('click', () => {
    titleReplacer(`desc${next}`);
    descriptionReplacer(`desc${next}`);

    const btn = document.querySelector(`#btn-desc${next}`);
    const target = btn.getAttribute('d-target');

    current = target;
    prev = btn.getAttribute('d-prev');
    next = btn.getAttribute('d-next');
  });
});
