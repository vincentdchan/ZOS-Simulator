/************************ 
 * Author: DZ Chan 
 * Date:   2017-08-12 
 ************************/

import style from "../stylesheets/file.scss"

const template = `<div class="file-item">
    <img v-if="fileType == 'folder'" src="assets/images/Folder-icon.png" class="file-icon" />
    <img v-else src="assets/images/Text-Document-icon.png" class="file-icon" />
    <p class="filename">{{ filename }}</p>
</div>`

export const FileItemComponent = {

    props: ['fileType', 'filename'],

    template: template,

}
