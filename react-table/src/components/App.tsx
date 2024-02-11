import React, { useEffect, useState } from 'react'
import Header from './Header'
import Table from './Table/Table'
import { getRows } from '../db/rows'
import { Row } from '../db/model'

const originalRows = getRows()

const sortMap: { asc: number; desc: number } = {
  asc: 0,
  desc: 1,
}

const App = (): React.ReactElement | null => {
  const [search, setSearch] = useState('')
  const [deletedRows, setDeletedRows] = useState([] as Row[])
  const [filteredRows, setFilteredRows] = useState(originalRows)
  const [sortContainer, setSortContainer] = useState<{
    [key: string]: number
  }>({})

  function removeDeletedFromFiltered(array1: Row[], array2: Row[]) {
    const idsToRemove = new Set(array2.map(obj => obj.id))
    return array1.filter(obj => !idsToRemove.has(obj.id))
  }

  useEffect(() => {
    setFilteredRows((prevFilteredRows) => {
      const deletedIds = new Set(deletedRows.map((r) => r.id))
      return prevFilteredRows.filter((row) => !deletedIds.has(row.id))
    })
  }, [deletedRows])

  useEffect(() => {
    const filtered = originalRows.filter(
      (row) =>
        row.name.toLowerCase().includes(search) ||
        row.email.toLowerCase().includes(search),
    )
    // this is to avoid showing deleted rows in search results
    const res = removeDeletedFromFiltered(filtered, deletedRows)
    setFilteredRows(res)
  }, [search])


  const debounce = <T extends any[]>(func: (...args: T) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout
    return function(...args: T) {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        // @ts-ignoreÏ
        func.apply(this, args)
      }, delay)
    }
  }

  const debouncedPerformSearch = debounce((value: string) => {
    setSearch(value.toLowerCase())
  }, 200)

  const performSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = e.target
    debouncedPerformSearch(value)
  }

  const performDelete = (removedRows: Row[]) => {
    if (deletedRows.length > 0) {
      removedRows.push(...deletedRows)
    }
    setDeletedRows(removedRows)
  }

  const performSort = (columnName: keyof Row) => {
    const isAscending = sortContainer[columnName] === sortMap.asc
    const sorted = filteredRows.sort((one: Row, two: Row) => {
      if (isAscending) {
        return two[columnName] > one[columnName] ? 1 : -1
      }
      return one[columnName] > two[columnName] ? 1 : -1
    })

    setSortContainer((prev) => ({
      ...prev,
      [columnName]: isAscending ? sortMap.desc : sortMap.asc,
    }))

    setFilteredRows(sorted)
  }

  return (
    <div style={{ margin: 20 }}>
      <Header performSearch={performSearch} />
      <Table rows={filteredRows} performSort={performSort} performDelete={performDelete} />
    </div>
  )
}

export default App
