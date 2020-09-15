import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: '',
    template: '',
    styles: [
    ]
})
export class RedirectComponent implements OnInit {

    constructor(
        private router: Router,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        // this.router.navigate(['/slike'], { relativeTo: this.route, preserveQueryParams: true });
        this.router.navigate(['/slike'], { relativeTo: this.route,  queryParamsHandling: "preserve" });

    }


}
