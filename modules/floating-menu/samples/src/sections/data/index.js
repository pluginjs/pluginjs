import { query } from '@pluginjs/dom'
import FloatingMenu from '@pluginjs/floating-menu'

const element = query('#data')
const customData = {
  toggle: [
    {
      title: 'Demos',
      url: '#',
      external: false,
      id: 'demos',
      icon: 'pj-icon pj-icon-star-solid'
    },
    {
      title: 'Buy Now',
      url: '#',
      external: true,
      id: false,
      icon: 'pj-icon pj-icon-shop'
    },
    {
      title: 'Blogs',
      url: '#',
      external: false,
      id: 'blogs',
      icon: 'pj-icon pj-icon-news'
    }
  ],
  panel: [
    {
      id: 'demos',
      html: `
      <div class="demo-panel">
        <div class="demo-header">
          <h2 class="demo-title">Demos</h2>
          <hr>
        </div>
        <div class="demo-content">
          <div class="row row-cols-2">
            <div class="col">
              <a href="javascript:void(0)" class="demo-link" title="Demo Content 1">
                <div class="demo-placeholder">Demo Content 1</div>
              </a>
            </div>
            <div class="col">
              <a href="javascript:void(0)" class="demo-link" title="Demo Content 2">
                <div class="demo-placeholder">Demo Content 2</div>
              </a>
            </div>
            <div class="col">
              <a href="javascript:void(0)" class="demo-link" title="Demo Content">
                <div class="demo-placeholder">Demo Content 3</div>
              </a>
            </div>
            <div class="col">
              <a href="javascript:void(0)" class="demo-link" title="Demo Content">
                <div class="demo-placeholder">Demo Content 4</div>
              </a>
            </div>
            <div class="col">
              <a href="javascript:void(0)" class="demo-link" title="Demo Content">
                <div class="demo-placeholder">Demo Content 5</div>
              </a>
            </div>
            <div class="col">
              <a href="javascript:void(0)" class="demo-link" title="Demo Content">
                <div class="demo-placeholder">Demo Content 6</div>
              </a>
            </div>
            <div class="col">
              <a href="javascript:void(0)" class="demo-link" title="Demo Content">
                <div class="demo-placeholder">Demo Content 7</div>
              </a>
            </div>
            <div class="col">
              <a href="javascript:void(0)" class="demo-link" title="Demo Content">
                <div class="demo-placeholder">Demo Content 8</div>
              </a>
            </div>
            <div class="col">
              <a href="javascript:void(0)" class="demo-link" title="Demo Content">
                <div class="demo-placeholder">Demo Content 9</div>
              </a>
            </div>
            <div class="col">
              <a href="javascript:void(0)" class="demo-link" title="Demo Content">
                <div class="demo-placeholder">Demo Content 10</div>
              </a>
            </div>
            <div class="col">
              <a href="javascript:void(0)" class="demo-link" title="Demo Content">
                <div class="demo-placeholder">Demo Content 11</div>
              </a>
            </div>
            <div class="col">
              <a href="javascript:void(0)" class="demo-link" title="Demo Content">
                <div class="demo-placeholder">Demo Content 12</div>
              </a>
            </div>
          </div>
        </div>
        <div class="demo-footer">
          <hr>
          <div class="demo-footer-items">
            Demo Footer
          </div>
        </div>
      </div>`
    },
    {
      id: 'blogs',
      html: `
      <div class="demo-panel">
        <div class="demo-header">
          <h2 class="demo-title">Blogs</h2>
          <hr>
        </div>
        <div class="demo-content">
          <div class="row row-cols-2">
            <div class="col">
              <a href="javascript:void(0)" class="demo-link">
                <div class="demo-placeholder placeholder-bg">Blog Content 1</div>
              </a>
            </div>
            <div class="col">
              <a href="javascript:void(0)" class="demo-link">
                <div class="demo-placeholder placeholder-bg">Blog Content 2</div>
              </a>
            </div>
            <div class="col">
              <a href="javascript:void(0)" class="demo-link">
                <div class="demo-placeholder placeholder-bg">Blog Content 3</div>
              </a>
            </div>
            <div class="col">
              <a href="javascript:void(0)" class="demo-link">
                <div class="demo-placeholder placeholder-bg">Blog Content 4</div>
              </a>
            </div>
            <div class="col">
              <a href="javascript:void(0)" class="demo-link">
                <div class="demo-placeholder placeholder-bg">Blog Content 5</div>
              </a>
            </div>
            <div class="col">
              <a href="javascript:void(0)" class="demo-link">
                <div class="demo-placeholder placeholder-bg">Blog Content 6</div>
              </a>
            </div>
            <div class="col">
              <a href="javascript:void(0)" class="demo-link">
                <div class="demo-placeholder placeholder-bg">Blog Content 7</div>
              </a>
            </div>
            <div class="col">
              <a href="javascript:void(0)" class="demo-link">
                <div class="demo-placeholder placeholder-bg">Blog Content 8</div>
              </a>
            </div>
            <div class="col">
              <a href="javascript:void(0)" class="demo-link">
                <div class="demo-placeholder placeholder-bg">Blog Content 9</div>
              </a>
            </div>
          </div>
        </div>
        <div class="demo-footer">
          <hr>
          <div class="demo-footer-items">
            Blog Footer
          </div>
        </div>
      </div>`
    }
  ]
}

FloatingMenu.of(element, {
  type: 'data',
  data: customData
})
