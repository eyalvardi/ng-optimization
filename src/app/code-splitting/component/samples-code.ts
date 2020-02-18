
export declare type CodeSample =  'sample1' | 'sample2' | 'sample3';

 const sample1 = `
<input #name>
<button (click)="name.value = 'Eyal Vardi'">Set name</button>
`;

 const sample2 = `       
<triangle name="1"></triangle>
<circle name="2"></circle>      
<square name="4"></square>
`;

 const sample3 = `
<triangle  *ngFor="let i of [1,2,3]" [name]="i"></triangle>
`;

export const codeSamples = {
    sample1,
    sample2,
    sample3
};

