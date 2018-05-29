// handle pop up panel
// process:
// cell --(click)-> popup
// popup --(click)-> n --(fill)-> cell

module.exports = class PopupNumbers {
    constructor($panel) {
        this._$panel = $panel.hide().remove("hidden");

        this._$panel.on("click", "span", e => {
            const $cell = this._$targetCell;
            const $span = $(e.target);

            // mark1 or mark2 then fill style
            if ($span.hasClass("mark1")) {
                if ($cell.hasClass("mark1")) {
                    $cell.removeClass("mark1");
                } else {
                    $cell.removeClass("mark2").add("mark1");
                }
            } else if ($span.hasClass("mark2")) {
                if ($cell.hasClass("mark2")) {
                    $cell.removeClass("mark2");
                } else {
                    $cell.removeClass("mark1").add("mark2");
                }
            } else if ($span.hasClass("empty")) {
                // empty, cancel number or mark
                // cancel number and mark
                $cell.text(0).addClass("empty");
            } else {
                // if 1-9, fill the number
                $cell.removeClass("empty").text($span.text());
            }
            this.hide();
        })
    }

    popup($cell) {
        this._$targetCell = $cell;
        const {left, top} = $cell.position();
        this._$panel
            .css({
                left: `${left}px`,
                top: `${top}px`
            })
            .show();
    }

    hide() {
        this._$panel.hide();
    }
};