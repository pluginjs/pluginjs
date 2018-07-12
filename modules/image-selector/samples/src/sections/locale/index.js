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
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAABaAQMAAABJzgCsAAAABlBMVEVHcEzl5eXDaodEAAAAAXRSTlMAQObYZgAAABxJREFUOMtj+I8KGEb5pPGpDUbDd5Q/yh/lQwEAsE32QnAjyHsAAAAASUVORK5CYII='
    },
    {
      value: 'left',
      label: 'Left',
      img:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAABaAgMAAAAObnp8AAAACVBMVEVHcEyZmZnl5eVsHKZCAAAAAXRSTlMAQObYZgAAAC1JREFUSMdjWIUXMIxKj0pTTXoQg1AQYNDC5fJR6VHpUelR6VHpUelR6SEnDQCZh+YV5cbxhgAAAABJRU5ErkJggg=='
    },
    {
      value: 'double-left',
      label: 'Double Left',
      img:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAABaAgMAAAAObnp8AAAACVBMVEVHcEyZmZnl5eVsHKZCAAAAAXRSTlMAQObYZgAAADBJREFUSMdjWIUXMIxKj0pTTXoQg1AQYBAFkQ5cmC4flR6VHpUelR6VHpUelR5y0gD0WUbiAs3tSQAAAABJRU5ErkJggg=='
    },
    {
      value: 'right',
      label: 'Right',
      img:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAABaAgMAAAAObnp8AAAACVBMVEVHcEyZmZnl5eVsHKZCAAAAAXRSTlMAQObYZgAAAC1JREFUSMdjWIUXMIxKj0pTTXoQAxxOXsEQCgKj0qPSo9Kj0qPSo9Kj0kNPGgBgWwYijq0BPgAAAABJRU5ErkJggg=='
    },
    {
      value: 'double-right',
      label: 'Double Right',
      img:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAABaAgMAAAAObnp8AAAACVBMVEVHcEyZmZnl5eVsHKZCAAAAAXRSTlMAQObYZgAAADFJREFUSMdjWIUXMIxKj0pTTXoQAwzHLmAMBYIQBhAZOio9Kj0qPSo9Kj0qPSo99KQBB0ps+IPl0foAAAAASUVORK5CYII='
    },
    {
      value: 'both-sider',
      label: 'Both Sider',
      img:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAABaAgMAAAAObnp8AAAACVBMVEVHcEyZmZnl5eVsHKZCAAAAAXRSTlMAQObYZgAAADBJREFUSMdjWIUXMIxKj0pTTXoQg1AQYNBCd/IKqMSo9Kj0qPSo9Kj0qPSo9JCTBgDLUE6A88f7dgAAAABJRU5ErkJggg=='
    }
  ]
})
