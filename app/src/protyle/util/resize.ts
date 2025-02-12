import {hideElements} from "../ui/hideElements";
import {setPadding} from "../ui/initUI";
import {hasClosestBlock} from "./hasClosest";

export const resize = (protyle: IProtyle) => {
    hideElements(["gutter"], protyle);
    setPadding(protyle);
    if (typeof echarts !== "undefined") {
        protyle.wysiwyg.element.querySelectorAll('[data-subtype="echarts"], [data-subtype="mindmap"]').forEach((chartItem: HTMLElement) => {
            const chartInstance = echarts.getInstanceById(chartItem.firstElementChild.nextElementSibling.getAttribute("_echarts_instance_"));
            if (chartInstance) {
                chartInstance.resize();
            }
        });
    }
    // 保持光标位置不变 https://ld246.com/article/1673704873983/comment/1673765814595#comments
    if (protyle.toolbar.range) {
        let rangeRect = protyle.toolbar.range.getBoundingClientRect();
        if (rangeRect.height === 0) {
            const blockElement = hasClosestBlock(protyle.toolbar.range.startContainer);
            if (blockElement) {
                rangeRect = blockElement.getBoundingClientRect();
            }
        }
        if (rangeRect.height === 0) {
            return;
        }
        const protyleRect = protyle.element.getBoundingClientRect();
        if (protyleRect.top + 30 > rangeRect.top || protyleRect.bottom < rangeRect.bottom) {
            protyle.toolbar.range.startContainer.parentElement.scrollIntoView(protyleRect.top > rangeRect.top);
        }
    }
};
