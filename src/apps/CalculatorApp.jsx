export function CalculatorApp() {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "5px" }}>
            <button>7</button><button>8</button><button>9</button>
            <button>4</button><button>5</button><button>6</button>
            <button>1</button><button>2</button><button>3</button>
        </div>
    );
}