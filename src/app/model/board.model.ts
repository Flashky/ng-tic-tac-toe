/**
 * Model class for representing a generic board.
 * 
 */
export class Board<T> {
    
    private cell: T[][] = [];

    private readonly MIN_RANGE = 0;
    
    private size: number;

    /**
     * Builds an empty board.
     * @param size The size of the board. 3 for a 3x3 board, 4 for a 4x4 board and so on.
     * @param defaultValue The default value that all the boards of the cell must have.
     */
    constructor(size: number, defaultValue: T) {
        
        if(size < 1) {
            throw new Error('Board size must be greater or equal to one.')
        }

        this.size = size;

        for(let i: number = 0; i < size; i++){
            this.cell[i] = [];
            for(let j: number = 0; j < size; j++){
                this.cell[i][j] = defaultValue;
            }
        }

        console.log(this.cell);
    }

    updateCell(row: number, column: number, value: T) {

        if((row < this.MIN_RANGE) || (row > this.size)) {
            throw new Error('Row must be between '+this.MIN_RANGE+' and '+this.size+'.')
        }

        if((column < this.MIN_RANGE) || (column > this.size)) {
            throw new Error('Column must be between '+this.MIN_RANGE+' and '+this.size+'.');
        }

        this.cell[row][column] = value;
    }

    getCell(row: number, column: number) {
        return this.cell[row][column];
    }


}