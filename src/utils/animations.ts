import {
  animation, animate, style, trigger, transition, query, animateChild, group
} from '@angular/animations';

export const fade = animation([
  style({
    opacity: '{{ opacity }}',
  }),
  animate('{{ time }}')
]);


export const fadeInAnimation = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('.5s', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('.5s', style({ opacity: 0 })),
  ]),
]);

export const popInAnimation = trigger('popIn', [
    transition(':enter', [
      style({ transform: 'scale(0)' }),
      animate('.3s', style({ transform: 'scale(1)' })),
    ]),
    transition(':leave', [
      animate('.3s', style({ transform: 'scale(0)' })),
    ]),
  ]);

export const horizontalSlideAnimation = trigger('horizonTalSlide', [
    transition(':enter', [
      style({ transform: 'translateX(1000px)' }),
      animate('.7s', style({ transform: 'translateX(0)' })),
    ]),
    transition(':leave', [
      animate('.7s', style({ transform: 'translateX(0)' })),
    ]),
  ]);

export const topSlideAnimation = trigger('topSlide', [
  transition(':enter', [
    style({ transform: 'translateY(-1000px)' }),
    animate('.7s', style({ transform: 'translateY(0)' })),
  ]),
  transition(':leave', [
    animate('.7s', style({ transform: 'translateY(0)' })),
  ]),
]);

export const routerSlideInAnimation =
  trigger('routeAnimations', [
    transition('* <=> HomePage', [
      style({ position: 'relative' }),
      query(':enter', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          background: '#fff'
        })
      ]),
      query(':enter', [
        style({ left: '-100%', background: '#fff' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '100%', background: '#fff' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%', background: '#fff' }))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);
