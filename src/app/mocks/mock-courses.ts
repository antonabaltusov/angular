import { ICourse } from '../shared/models/course/course.model';

export const COURSES: ICourse[] = [
  { id: 0,
    title: 'Angular2: From Zero To Hero',
    creation: new Date(2022,1,23),
    duration: 45,
    description: `This course will not only teach you to program using AngularJS but also how to think in Angular JS
    and how to architect, design and test a modern web application.`,
    topRated: false,
   },
  { id: 1,
    title: 'rgnx: From Zero To Hero',
    creation: new Date(2022, 2, 1),
    duration: 97,
    description: `other description. This course will not only teach you to program using AngularJS but also how to think in Angular JS
    and how to architect, design and test a modern web application.`,
    topRated: false,
  },
  { id: 2,
    title: 'Angular2: From Zero To Hero',
    creation: new Date(2018, 5, 29),
    duration: 67,
    description: `This course will not only teach you to program using AngularJS but also how to think in Angular JS
    and how to architect, design and test a modern web application.`,
    topRated: true,
  },
  { id: 3,
    title: 'Angular2: From Zero To Hero',
    creation: new Date(2018, 5, 29),
    duration: 97,
    description: `This course will not only teach you to program using AngularJS but also how to think in Angular JS
    and how to architect, design and test a modern web application.`,
    topRated: false,
  },
  { id: 4,
    title: 'Angular2: From Zero To Hero',
    creation: new Date(2018, 5, 29),
    duration: 133,
    description: `This course will not only teach you to program using AngularJS but also how to think in Angular JS
    and how to architect, design and test a modern web application.`,
    topRated: false,
  },
];
