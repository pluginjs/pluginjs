import { query } from '@pluginjs/dom'
import popDialog from '@pluginjs/pop-dialog'

const root = query('#contents')
const tableElement = query('[data-toggle="pop-dialog-table"]', root)
const largeContentElement = query(
  '[data-toggle="pop-dialog-largeContent"]',
  root
)
const iframeElement = query('[data-toggle="pop-dialog-iframe"]', root)

popDialog.of(tableElement, {
  content() {
    return `<table class="popover-table popover-table-bordered">
    <thead>
      <tr>
        <th>Rank</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>User Name</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
      </tr>
    </tbody>
  </table>`
  }
})

popDialog.of(largeContentElement, {
  content() {
    return `<p><a href="#" class="pop-click">click</a> The jQuery Foundation&#8217;s <a href="http://jquery.org/mission">mission</a> has always been about more than just our namesake projects of jQuery, jQuery UI, and jQuery Mobile. We already host several projects such as Sizzle, QUnit and Globalize that are not dependent on the jQuery library.</p>
    <p>This wider web-oriented mission is evident in our jQuery Conferences, which span a wide range of developer concerns beyond jQuery, including Node, CSS, tooling, testing and much more. Over the years we&#8217;ve had talks on build tools, accessibility, security, performance, design patterns, and frameworks such as Ember and Angular. At our San Diego conference this past February, for example, Lenny Markus gave a great talk on <a title="NodeJS In the Enterprise" href="https://www.youtube.com/watch?v=qJVk6KiOEBA" target="_blank">PayPal&#8217;s continuing adoption of Node</a> as they move away from Java and proprietary solutions, Catherine Farman talked about <a title="Real World Responsive Design Projects and Patterns" href="https://www.youtube.com/watch?v=CkC8F3x8-nc" target="_blank">real world responsive design</a>, and John Dimm gave a talk on the <a title="Fun with Speech" href="https://www.youtube.com/watch?v=n8G1CuR2zZc" target="_blank">HTML5 speech APIs</a>.</p>
    <p>The jQuery Foundation is participating in the continuing evolution of the web platform via our memberships in both the W3C and ECMA TC39 (The group standardizing what we know as JavaScript). We feel that it&#8217;s essential to have strong representation in those standards groups to ensure they meet the needs of developers. The Foundation provides a platform for developers to have a voice in these standards bodies.</p>
    <p>Beyond the technical compatibility between our projects, we also share the open source model and all the benefits it provides. The Foundation adds the benefit of a top-level structure designed to serve the projects, providing the resources they need but letting the contributors decide the best direction for the project based on community input. Any project that joins the Foundation is given the ability to serve their community&#8217;s needs rather than be constrained by the goals of a for-profit company.</p>
    <p>Though this has been our mission for a long time, we felt we needed to make this clearer. We are excited to start bringing this part of our mission into the light and start actively working toward a more open web accessible to everyone. If you are excited as well, please help us. Contribute your time to <a href="https://jquery.org/projects/" target="_blank">Foundation projects</a>. Offer your company&#8217;s services. If you or your company have an established open source project that you believe could benefit everyone and flourish by becoming part of the jQuery Foundation, check out our philosophy around <a href="https://jquery.org/projects/join/">projects joining the Foundation</a> and <a href="mailto:info@jquery.org">var us know you’re interested</a>. If you would rather just support the existing and future projects of the Foundation through financial support, <a href="https://jquery.org/join/">become a member of the Foundation.</a> Open source projects will only thrive if everyone who benefits from them contributes back in whatever way they can.</p>`
  }
})

popDialog.of(iframeElement, {
  content() {
    return `<iframe src="http://getbootstrap.com" frameborder="0" allowtransparency="true" height="100%" width="100%">
    </iframe>`
  }
})
