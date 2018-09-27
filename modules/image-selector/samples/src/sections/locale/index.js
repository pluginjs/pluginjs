import { query } from '@pluginjs/dom'
import ImageSelector from '@pluginjs/image-selector'

const element = query('#locale .example-locale')
ImageSelector.of(element, {
  locale: 'zh',
  select: 'right',
  data: [
    {
      value: 'without',
      label: 'Without',
      img:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwAgMAAAAqbBEUAAAADFBMVEVHcEwzMzM0NDQzMzNXVqCWAAAAA3RSTlMA8oVBLjBOAAAALElEQVQoz2NgoBTM4Gz4DwMMJewOCA6KDDngPxJA5XxAKOIf5VCDgzusqQoAAs1nmZ74iycAAAAASUVORK5CYII='
    },
    {
      value: 'left',
      label: 'Left',
      img:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAD1BMVEVHcEwzMzM0NDQzMzPY2NhooyRWAAAAA3RSTlMA8oVBLjBOAAAANUlEQVQ4y2NgGJRAUQGEjDEAg7AACGGRwKmDHgBqFabluCVcgABIoRs0KjEqQWcJktPuQAIABclOuR4N2egAAAAASUVORK5CYII='
    },
    {
      value: 'double-left',
      label: 'Double Left',
      img:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAElBMVEVHcEwzMzM0NDSbm5vY2NgzMzMWQYanAAAABHRSTlMA8oXKOJaGhAAAADZJREFUOMtjYBiUQFEBhEIxAIOwAAhhkcCpgx4AahUKhSmCIuECBKgUpsioxKgE7SVITrsDCQDzJdK9m95DDwAAAABJRU5ErkJggg=='
    },
    {
      value: 'right',
      label: 'Right',
      img:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAD1BMVEVHcEwzMzM0NDQzMzPY2NhooyRWAAAAA3RSTlMA8oVBLjBOAAAANUlEQVQ4y2NgGEigqABCxhiAQVgAhLBI4NRBD4BpKwqFTQLdBAZjFyAYlRiVoLcEyWl3UAIAW5xOuT4bYEgAAAAASUVORK5CYII='
    },
    {
      value: 'double-right',
      label: 'Double Right',
      img:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAD1BMVEVHcEwzMzM0NDQzMzPY2NhooyRWAAAAA3RSTlMA8oVBLjBOAAAAN0lEQVQ4y2NgGJRAUQGEjDEAg7AACGGRwKmDHgDJOmwUNgm4VgZjFyBAUKMSoxJ0lSA57Q4kAAAoS3PpHVJb6QAAAABJRU5ErkJggg=='
    },
    {
      value: 'both-sider',
      label: 'Both Sider',
      img:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAD1BMVEVHcEwzMzM0NDQzMzPY2NhooyRWAAAAA3RSTlMA8oVBLjBOAAAAOUlEQVQ4y2NgGJRAUQGEjDEAg7AACGGRwKmDHgBqFZKt2CgUERcgAFJwE+AioxKjEnSVIDntDiQAAH56c+ngBeirAAAAAElFTkSuQmCC'
    }
  ]
})
