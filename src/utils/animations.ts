import {
  animation, animate, style
} from '@angular/animations';

export const fade = animation([
  style({
    opacity: '{{ opacity }}',
  }),
  animate('{{ time }}')
]);

