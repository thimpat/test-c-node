//+---------------------------------------------------------------------------
//
//  dll.c - Windows DLL example - dynamically linked part
//

#include <windows.h>
#include "fib.h"

__declspec(dllexport) const char *hello_data = "(not set)";

__declspec(dllexport) char* hello_func (void)
{
    char str[100];
    int aa = fib(5);
    sprintf(str, "From DLL: %d", aa);
    MessageBox (0, hello_data, str, MB_ICONINFORMATION);
    return "All okay";
}
