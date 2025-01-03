from app.utils import calculate_discount

def test_calculate_discount():
    result = calculate_discount(100, 10)
    assert result == 90