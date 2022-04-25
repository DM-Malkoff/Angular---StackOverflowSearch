import {animate, state, style, transition, trigger} from "@angular/animations";

export const searchFormMove = trigger('searchBlock', [
    state('start', style({
      position:'absolute',
      top:'50%',
      width: '100%',
      marginTop: '-70px'
    })),
    state('end', style({
      position:'static',
      top:'0%',
      width:'100%'
    })),
    transition('start => end', [
      style({
        position:'absolute',
        top:'20%',
        width: '100%',
        marginTop: '0px'
      }),
      animate(500)
    ])
  ]
)

export const showTable = trigger('showTable', [
    state('start', style({
      opacity: 0
    })),
    state('end', style({
      opacity: 1
    })),
    transition('start => end', animate(4000))
  ]
)
